import emoji from 'node-emoji'
import yargs from 'yargs/yargs'
import dotenv from 'dotenv'
import path, { format } from 'path'
import Mongo from './lib/MongoDB'

import { LoggerProd, LoggerInfo, LoggerDebug, ILogg } from './lib/Logger'

export const initializeEnvironment = (): void => {
  const argv = yargs(process.argv.slice(2))
    .options({
      NODE_ENV: { type: 'string', default: '' },
    })
    .parseSync()

  const envFile = argv.NODE_ENV ? `.env.${argv.NODE_ENV}` : `.env`

  dotenv.config({ path: path.resolve() + '/' + envFile })
}

export const isEmptyEnvVariable = (envVariables: {}): boolean => {
  let isEmpty = false
  Object.entries(envVariables).map((env) => {
    if (typeof env[1] === 'undefined') {
      LoggerProd.msg.error(`[.env]  - ${env[0]} is empty.! ${emoji.get('x')} `)
      isEmpty = true
    }
  })

  return isEmpty
}

export const Logg = (message: string): ILogg => ({
  log: () => {
    LoggerInfo.msg.info(message)
  },
  file: () => {
    LoggerProd.msg.error(message)
  },
  debug: () => {
    if (process.env.ENVIRONMENT !== 'production') {
      LoggerDebug.msg.warn(message)
    }
  },
})

export const connectToDB = async (URI: string): Promise<boolean> => {
  try {
    const db = new Mongo(URI)
    await db.connect()
    return true
  } catch (error: any) {
    Logg(` MONGO- CONNECTION - ${error.message}`).file()
    return false
  }
}
