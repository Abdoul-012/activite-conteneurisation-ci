import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function App() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUsers() {
      try {
        setStatus('loading')
        const response = await fetch(`${API_URL}/users`)
        if (!response.ok) {
          throw new Error(`Erreur API: ${response.status}`)
        }
        const data = await response.json()
        setUsers(data.utilisateurs ?? [])
        setStatus('success')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
        setStatus('error')
      }
    }

    loadUsers()
  }, [])

  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">Activité 3</p>
        <h1>Fullstack React + FastAPI + MySQL</h1>
        <p className="subtitle">
          Cette interface consomme le vrai endpoint <code>/users</code> du backend.
        </p>

        {status === 'loading' && <p className="info">Chargement des utilisateurs…</p>}
        {status === 'error' && <p className="error">{error}</p>}

        {status === 'success' && (
          <>
            <div className="badge">API réelle connectée</div>
            <h2>Utilisateurs</h2>
            <ul className="list">
              {users.map((user) => (
                <li key={user.id} className="listItem">
                  <strong>{user.nom}</strong>
                  <span>{user.email}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  )
}
