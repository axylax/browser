import React from 'react';

export function DashboardPage() {
  const cards = [
    { label: 'Профили', value: 4 },
    { label: 'Запущено задач', value: 0 },
    { label: 'Добавлено товаров', value: 0 },
    { label: 'Ошибки', value: 0 },
    { label: 'Активные процессы', value: 0 }
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="card-grid">
        {cards.map((card) => (
          <article key={card.label} className="stat-card">
            <div className="card-label">{card.label}</div>
            <div className="card-value">{card.value}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
