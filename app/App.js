import { AuthController } from './controllers/AuthController.js';
import { GiftController } from './controllers/GiftController.js';
import { SandboxController } from './controllers/SandboxController.js';
import { router } from './router-config.js';
const USE_ROUTER = false

class App {

  AuthController = new AuthController()

  GiftController = new GiftController()

  SandboxController = new SandboxController()


  constructor() {
    if (USE_ROUTER) {
      this.router = router
      this.router.init(this)
    }
  }
}


const app = new App()
// @ts-ignore
window.app = app
