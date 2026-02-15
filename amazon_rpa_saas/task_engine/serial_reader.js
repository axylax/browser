const fs = require('fs');

class SerialTaskReader {
  readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  // CSV fallback (Excel adapter-ready via converter in upstream pipeline)
  readCsv(filePath) {
    const lines = fs.readFileSync(filePath, 'utf-8').trim().split(/\r?\n/);
    const headers = lines[0].split(',').map((x) => x.trim());
    return lines.slice(1).map((line) => {
      const cols = line.split(',');
      const row = {};
      headers.forEach((h, i) => row[h] = (cols[i] || '').trim());
      return row;
    });
  }
}

module.exports = { SerialTaskReader };
