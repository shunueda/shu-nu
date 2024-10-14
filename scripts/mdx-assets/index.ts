import { cp, readdir, rm } from 'node:fs/promises'
import { join } from 'node:path'

const dirs = {
  src: 'src',
  blog: 'blog',
  public: 'public'
}

await rm(join(dirs.public, dirs.blog), {
  force: true,
  recursive: true
})

const dirents = await readdir(join(dirs.src, dirs.blog), {
  recursive: true,
  withFileTypes: true
})

await Promise.all(
  dirents
    .filter(it => it.isFile() && !it.name.endsWith('.md'))
    .map(async ({ parentPath, name }) =>
      cp(
        join(parentPath, name),
        join(
          dirs.public,
          parentPath.replace(join(dirs.src, dirs.blog), ''),
          name
        ),
        {
          recursive: true
        }
      )
    )
)
