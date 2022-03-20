import { expect } from 'chai'
import { getEnvFile, checkEmptyEnvVariable } from '../src/index'

describe('Env config', () => {
  it('should return string', () => {
    const data = getEnvFile()
    expect(data).to.be.string
  })
  it('should return .env', () => {
    const data = getEnvFile()
    expect(data).to.contain('.env')
  })
})
