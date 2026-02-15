import React from 'react';

export function AutomationControlPage() {
  return (
    <div>
      <h1>Automation Control</h1>
      <h2>Сейчас: IDLE</h2>
      <div className="row gap12">
        <input className="input small" defaultValue="1" />
        <button className="btn btn-green">START AUTOMATION</button>
        <button className="btn btn-orange">STOP AUTOMATION</button>
        <button className="btn btn-blue">RESTART</button>
      </div>
    </div>
  );
}
