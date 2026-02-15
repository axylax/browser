import React from 'react';

export function TaskManagerPage() {
  return (
    <div>
      <h1>Task Manager (Amazon)</h1>
      <div className="row gap12 mb16">
        <button className="btn btn-green">ЗАГРУЗИТЬ EXCEL</button>
        <button className="btn btn-dark">ЗАПУСТИТЬ АВТОМАТИЗАЦИЮ</button>
      </div>

      <p className="mb8">Прогресс: 0%</p>
      <div className="progress mb24">
        <div className="progress-inner" style={{ width: '0%' }} />
      </div>

      <h2>Список задач</h2>
      <table className="table mb24">
        <thead>
          <tr>
            <th>ID</th>
            <th>Файл</th>
            <th>Статус</th>
            <th>Обработано</th>
            <th>Добавлено</th>
          </tr>
        </thead>
      </table>

      <h2>ASIN из выбранной задачи</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ASIN</th>
            <th>Товар</th>
            <th>Статус</th>
            <th>Сообщение</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
