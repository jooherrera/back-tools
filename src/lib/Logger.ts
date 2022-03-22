import winston from 'winston'

const myFormatConsole = winston.format.combine(
  winston.format.label({ label: '[Error]' }),
  winston.format.printf((info) => `${info.label} - El error surge en: --> ${info.message}`),
  winston.format.colorize({ all: true })
)
const myFormatFile = winston.format.combine(
  winston.format.label({ label: 'Error' }),
  winston.format.timestamp({ format: 'DD-MM-YYYY -- HH:mm:ss' }),
  winston.format.printf((error) => `${error.label} - {${error.timestamp}} | El error surge en: --> ${error.message}`)
)
const formatInfo = winston.format.combine(
  winston.format.label({ label: '[Info]' }),
  winston.format.printf((info) => `${info.label} -> ${info.message}`),
  winston.format.colorize({ all: true })
)

const formatWarn = winston.format.combine(
  winston.format.label({ label: '[Debug]' }),
  winston.format.printf((warn) => `${warn.label} -> ${warn.message}`),
  winston.format.colorize({ all: true })
)

const LoggerProd = {
  msg: winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: myFormatConsole,
      }),

      new winston.transports.File({
        format: myFormatFile,
        filename: './logs/error.log',
        level: 'error',
      }),
    ],
  }),
}

const LoggerInfo = {
  msg: winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: formatInfo,
      }),
    ],
  }),
}

const LoggerDebug = {
  msg: winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: formatWarn,
      }),
    ],
  }),
}

export interface ILogg {
  log: () => void
  file: () => void
  debug: () => void
}

export { LoggerInfo, LoggerProd, LoggerDebug }
