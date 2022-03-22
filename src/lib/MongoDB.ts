import mongoose from 'mongoose'

class MongoDB {
  private URI: string
  constructor(uri: string) {
    this.URI = uri
  }

  connect(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await mongoose.connect(this.URI))
      } catch (error) {
        reject(false)
      }
    })
  }
}

export default MongoDB
