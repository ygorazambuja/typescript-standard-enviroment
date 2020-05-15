import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

class App {
  public app: express.Application
  public port: number

  constructor (controllers, port) {
    this.app = express()
    this.port = port
    this.initializeMiddlewares()
    dotenv.config()
    this.mongooseConnect().catch(error => new Error(error))
    this.initializeControllers(controllers)
  }

  private initializeMiddlewares (): void {
    this.app.use(express.json())
  }

  private initializeControllers (controllers): void {
    controllers.forEach(controller => {
      this.app.use(controller.router)
    })
  }

  private async mongooseConnect (): Promise<void> {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  public listen (): void {
    this.app.listen(this.port, () => {
      console.log(`listening on port ${this.port}`)
    })
  }
}

export default App
