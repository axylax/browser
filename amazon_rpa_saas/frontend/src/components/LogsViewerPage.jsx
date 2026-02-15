import React from 'react';

export function LogsViewerPage() {
  return (
    <div>
      <h1>Logs Viewer</h1>
      <div className="row gap12 mb16 align-center">
        <label className="row gap8 align-center">
          <span className="toggle" />
          Показать только ошибки
        </label>
        <button className="btn btn-outline">СКАЧАТЬ ЛОГ</button>
      </div>

      <pre className="log-box">[2026-02-15T06:22:44.540Z] [info] [system] Сервер запущен и готов к работе</pre>
    </div>
  );
}
