import App from './app'
import ToolController from './tool/tool.controller'

const app = new App([new ToolController()], 3000)

app.listen()
