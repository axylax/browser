import React, { useMemo, useState } from 'react';
import './styles.css';
import { DashboardPage } from './components/DashboardPage';
import { ProfilesManagerPage } from './components/ProfilesManagerPage';
import { TaskManagerPage } from './components/TaskManagerPage';
import { SettingsPage } from './components/SettingsPage';
import { LogsViewerPage } from './components/LogsViewerPage';
import { AutomationControlPage } from './components/AutomationControlPage';

const MENU = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'profiles', label: 'Profiles Manager' },
  { key: 'tasks', label: 'Task Manager' },
  { key: 'settings', label: 'Settings' },
  { key: 'logs', label: 'Logs Viewer' },
  { key: 'automation', label: 'Automation Control' }
];

export default function App() {
  const [active, setActive] = useState('dashboard');

  const content = useMemo(() => {
    switch (active) {
      case 'profiles':
        return <ProfilesManagerPage />;
      case 'tasks':
        return <TaskManagerPage />;
      case 'settings':
        return <SettingsPage />;
      case 'logs':
        return <LogsViewerPage />;
      case 'automation':
        return <AutomationControlPage />;
      default:
        return <DashboardPage />;
    }
  }, [active]);

  return (
    <div className="saas-root">
      <aside className="sidebar">
        <div className="brand">AdsPower + Amazon SaaS</div>
        <nav>
          {MENU.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`menu-item ${active === item.key ? 'active' : ''}`}
              onClick={() => setActive(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <section className="content">{content}</section>
    </div>
  );
}
