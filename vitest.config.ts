import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// Same aliases as the tsconfig paths. Anchored regexes: a plain '@' key would
// also catch scoped packages such as @vitest/*.
const dir = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@\//, replacement: dir('./src/') },
      { find: /^@content\//, replacement: dir('./content/') },
    ],
  },
  test: { include: ['src/**/*.test.ts'] },
})
