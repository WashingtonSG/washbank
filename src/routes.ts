import { Router } from 'express'
import { 
    CreateUserController,
    CreateAccountController,
    CreateTransactionController }
    from './controllers'

const routes = Router()

// const createAccountController = new CreateAccountController()
// const createTransactionController = new CreateTransactionController()

routes.route('/users')
    .post(new CreateUserController().handle.bind(new CreateUserController()))
routes.route('/accounts')
    .post(new CreateAccountController().handle.bind(new CreateAccountController()))
routes.route('/transactions')
    .post( new CreateTransactionController().handle.bind(new CreateTransactionController()))
// routes.post('/accounts/', createAccountController.handle)

export { routes }