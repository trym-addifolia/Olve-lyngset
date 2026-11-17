// Runs a command with the Cloudflare credentials from .cloudflare.env (git-ignored).
// Kept out of .env on purpose: Next and OpenNext read .env* at build and would
// carry the API token into the Worker bundle.
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'

const file = new URL('../.cloudflare.env', import.meta.url)
if (!existsSync(file)) {
  console.error('Mangler .cloudflare.env (se .env.example).')
  process.exit(1)
}
const env = { ...process.env }
for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
  const m = /^\s*(CLOUDFLARE_[A-Z_]+)\s*=\s*(.*?)\s*$/.exec(line)
  if (m) env[m[1]] = m[2]
}
if (!env.CLOUDFLARE_API_TOKEN) {
  console.error('CLOUDFLARE_API_TOKEN er tom i .cloudflare.env.')
  process.exit(1)
}

const [cmd, ...args] = process.argv.slice(2)
// Windows needs the shell to find wrangler.cmd; the shell then re-splits on spaces
const win = process.platform === 'win32'
const quoted = win ? args.map((a) => (/[\s"&|<>^()]/.test(a) ? `"${a.replace(/"/g, '\\"')}"` : a)) : args
const result = spawnSync(cmd, quoted, { stdio: 'inherit', env, shell: win })
process.exit(result.status ?? 1)
