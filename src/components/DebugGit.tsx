// src/components/DebugGit.tsx
import { useState } from 'react'
import { detectGit } from '../lib/git'
import { getGitPath } from '../lib/store'

export default function DebugGit() {
  const [status, setStatus] = useState('idle')
  const [detected, setDetected] = useState<{ path?: string; version?: string }>({})
  const [busy, setBusy] = useState(false)

  const onDetect = async () => {
    if (busy) return
    setBusy(true)
    setStatus('detecting...')
    try {
      const res = await detectGit()
      if (res.ok) {
        setDetected({ path: res.path, version: res.version })
        setStatus('ok')
      } else {
        setDetected({})
        setStatus(`error: ${res.error}`)
        console.error('[detectGit] error:', res.error)
      }
    } finally {
      setBusy(false)
    }
  }

  const onLoadSaved = async () => {
    const p = await getGitPath()
    setStatus(`saved: ${p ?? '(none)'}`)
  }

  return (
    <div style={{ padding: 16, border: '1px solid #444', borderRadius: 8 }}>
      <h3>Debug: Git detection</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <button onClick={onDetect} disabled={busy}>
          Detect from PATH
        </button>
        <button onClick={onLoadSaved} disabled={busy}>
          Show saved path
        </button>
      </div>
      <pre style={{ background: '#111', padding: 8, borderRadius: 4 }}>
        status: {status}
        {'\n'}path: {detected.path ?? '-'}
        {'\n'}version: {detected.version ?? '-'}
      </pre>
    </div>
  )
}
