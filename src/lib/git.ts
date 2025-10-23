// src/lib/git.ts
import { Command } from '@tauri-apps/plugin-shell'
import { getGitPath, setGitPath } from './store'

export type GitDetectResult =
  | { ok: true; path: string; version: string }
  | { ok: false; error: string }

function withTimeout<T>(p: Promise<T>, ms: number, label = 'operation'): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`${label} timeout after ${ms}ms`)), ms)
    p.then((v) => { clearTimeout(t); resolve(v) })
      .catch((e) => { clearTimeout(t); reject(e) })
  })
}

async function runGitVersion(bin: string): Promise<string> {
  const output = await withTimeout(
    Command.create(bin, ['--version']).execute(),
    5000,
    `git --version (${bin})`
  )
  if (output.code !== 0) throw new Error(output.stderr || `git exited: ${output.code}`)
  const text = (output.stdout || '').trim()
  if (!text.toLowerCase().includes('git version')) throw new Error(`unexpected output: ${text}`)
  return text
}

export async function detectGit(): Promise<GitDetectResult> {
  // （互換）保存値が 'git' 以外なら無視して消す
  const saved = await getGitPath()
  if (saved && saved !== 'git') {
    await setGitPath(null)
  }

  try {
    const version = await runGitVersion('git')
    await setGitPath('git') // 明示保存しておく（不要なら外してOK）
    return { ok: true, path: 'git', version }
  } catch (e: any) {
    const msg = String(e?.message || 'failed to run git --version')
    const hint = `${msg}. PATH に git がありません。Git for Windows をインストールし、環境変数 PATH に追加してください。`
    return { ok: false, error: hint }
  }
}
