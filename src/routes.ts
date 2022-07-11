import { Router } from 'express'
import { FindArrobasServices } from './services/FindArrobasServices'

const router = Router()

router.get('/arroba', async (request, response) => {
  const { url } = request.body

  const createUser = new FindArrobasServices()

  const user = await createUser.execute(url)

  const arrobas = {
    aleatorioArroba: user[Math.floor(Math.random() * user.length)],
    maisArroba: user[Math.floor(Math.random() * user.length)]
  }

  console.log(user)

  console.log(typeof user)

  return response.status(201).json(arrobas)
})

export { router }
