import { Router} from 'express'
import { getMesages, guardarMesages } from '../controllers/api.controller.js'

export const apiRouter = Router()

apiRouter.get('/',getMesages)
apiRouter.post('/create', guardarMesages)