import { networkInterfaces } from 'node:os'

const address =
  Object.values(networkInterfaces())
    .flat()
    .filter(it => it?.family === 'IPv4' && !it.internal)
    .at(0)?.address || '0.0.0.0'

console.log(address)
