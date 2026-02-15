class DistributionEngine {
  constructor(rng) { this.rng = rng; }

  assign(tasks, profiles) {
    const sortedProfiles = [...profiles].sort((a, b) => a.profile_id.localeCompare(b.profile_id));
    const profileAsins = new Map(sortedProfiles.map((p) => [p.profile_id, new Set()]));
    const asinLastProfile = new Map();
    const load = new Map(sortedProfiles.map((p) => [p.profile_id, 0]));

    const assigned = [];
    for (const task of tasks) {
      const candidates = sortedProfiles
        .filter((p) => !profileAsins.get(p.profile_id).has(task.asin))
        .filter((p) => asinLastProfile.get(task.asin) !== p.profile_id);

      const pool = candidates.length ? candidates : sortedProfiles.filter((p) => !profileAsins.get(p.profile_id).has(task.asin));
      if (!pool.length) continue;

      pool.sort((a, b) => load.get(a.profile_id) - load.get(b.profile_id));
      const selected = pool[0];

      assigned.push({ ...task, profile_id: selected.profile_id });
      profileAsins.get(selected.profile_id).add(task.asin);
      asinLastProfile.set(task.asin, selected.profile_id);
      load.set(selected.profile_id, load.get(selected.profile_id) + 1);
    }

    return assigned;
  }
}

module.exports = { DistributionEngine };
