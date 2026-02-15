import React from 'react';

const PROFILES = [
  { id: 4, name: 'Buyer_Profile_04', group: 'AMZ_BUYERS_GROUP', status: 'idle' },
  { id: 3, name: 'Buyer_Profile_03', group: 'AMZ_BUYERS_GROUP', status: 'idle' },
  { id: 2, name: 'Buyer_Profile_02', group: 'AMZ_BUYERS_GROUP', status: 'idle' },
  { id: 1, name: 'Buyer_Profile_01', group: 'AMZ_BUYERS_GROUP', status: 'idle' }
];

export function ProfilesManagerPage() {
  return (
    <div>
      <h1>Profiles Manager</h1>
      <div className="row gap12 mb24">
        <input className="input" placeholder="Имя профиля" />
        <button className="btn btn-green">ДОБАВИТЬ ПРОФИЛЬ</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Профиль</th>
            <th>Группа</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {PROFILES.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.id}</td>
              <td>{profile.name}</td>
              <td>{profile.group}</td>
              <td>
                <span className="pill">{profile.status}</span>
              </td>
              <td>
                <div className="row gap8">
                  <button className="btn btn-outline">START</button>
                  <button className="btn btn-outline">STOP</button>
                  <button className="btn btn-outline">ОТКРЫТЬ</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
