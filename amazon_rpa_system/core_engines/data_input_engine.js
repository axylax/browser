const fs = require('fs');
const path = require('path');

/**
 * Data Input Engine
 * Читает входные данные, валидирует и распределяет задачи по профилям.
 */
class DataInputEngine {
  constructor(rng) {
    this.rng = rng;
  }

  loadJson(filePath) {
    const abs = path.resolve(filePath);
    if (!fs.existsSync(abs)) throw new Error(`Файл не найден: ${abs}`);
    return JSON.parse(fs.readFileSync(abs, 'utf-8'));
  }

  validate(tasks, profiles) {
    if (!Array.isArray(tasks) || tasks.length === 0) throw new Error('Список задач пуст.');
    if (!Array.isArray(profiles) || profiles.length === 0) throw new Error('Список профилей пуст.');

    tasks.forEach((task, idx) => {
      if (!task.task_id || !task.asin) {
        throw new Error(`Некорректная задача #${idx}: нужны task_id и asin.`);
      }
    });
  }

  assignSerial(tasks, profiles) {
    // Детерминированная балансировка: round-robin по отсортированным profile_id.
    const sortedProfiles = [...profiles].sort((a, b) => a.profile_id.localeCompare(b.profile_id));
    const assigned = [];
    const seen = new Set();

    tasks.forEach((task, i) => {
      const profile = sortedProfiles[i % sortedProfiles.length];
      const lockKey = `${profile.profile_id}:${task.asin}`;
      if (seen.has(lockKey)) {
        // fallback: переназначение на следующий профиль.
        const alt = sortedProfiles[(i + 1) % sortedProfiles.length];
        assigned.push({ ...task, profile_id: alt.profile_id });
        seen.add(`${alt.profile_id}:${task.asin}`);
      } else {
        assigned.push({ ...task, profile_id: profile.profile_id });
        seen.add(lockKey);
      }
    });

    return assigned;
  }
}

module.exports = { DataInputEngine };
