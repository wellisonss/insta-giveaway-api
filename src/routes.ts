import { Router } from 'express'
import { FindArrobasServices } from './services/FindArrobasServices'

const router = Router()

router.get('/arroba', async (request, response) => {
  const { url } = request.body

  const createUser = new FindArrobasServices()

  const user = await createUser.execute(url)

  console.log(user)

  return response.status(201).json(user)
})

export { router }
