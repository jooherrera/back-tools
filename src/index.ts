import emoji from 'node-emoji'
import yargs from 'yargs/yargs'

export const getEnvFile = (fileName?: string): string => {
  const argv = yargs(process.argv.slice(2))
    .options({
      NODE_ENV: { type: 'boolean', default: false },
    })
    .parseSync()

  return argv.NODE_ENV && fileName ? `.env.${fileName}` : `.env`
}

export const isEmptyEnvVariable = (envVariables: {}): boolean => {
  let isEmpty = false
  Object.entries(envVariables).map((env) => {
    if (typeof env[1] === 'undefined') {
      console.log(`${env[0]} is empty.! ${emoji.get('x')} `)
      isEmpty = true
    }
  })
  return isEmpty
}
