import { writeFile } from 'node:fs/promises'

await writeFile('slugs.json', JSON.stringify(['a', 'b', 'c']))
