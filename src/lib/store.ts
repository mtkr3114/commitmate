// src/lib/store.ts
import { Store } from '@tauri-apps/plugin-store'

let store: Store | null = null

async function getStore(): Promise<Store> {
  if (!store) {
    store = await Store.load('app-settings.json')
  }
  return store
}

const KEY_GIT_PATH = 'git.path'

// 互換のため残すが、基本は 'git' 固定運用
export async function getGitPath(): Promise<string | null> {
  const s = await getStore()
  const value = await s.get<string | null>(KEY_GIT_PATH)
  return value ?? null
}

export async function setGitPath(path: string | null): Promise<void> {
  const s = await getStore()
  if (path && path.trim().length > 0) {
    await s.set(KEY_GIT_PATH, path)
  } else {
    await s.delete(KEY_GIT_PATH)
  }
  await s.save()
}
