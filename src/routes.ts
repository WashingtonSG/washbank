import { Router } from 'express'
import { 
    CreateUserController,
    CreateAccountController,
    CreateTransferController,
    CreateDepositController,
    CreateWithdrawController
}
    from './controllers'

const routes = Router()

// const createAccountController = new CreateAccountController()
// const CreateTransferController = new CreateTransferController()

routes.route('/users')
    .post(new CreateUserController().handle.bind(new CreateUserController()))
routes.route('/accounts')
    .post(new CreateAccountController().handle.bind(new CreateAccountController()))
routes.route('/transfers')
    .post( new CreateTransferController().handle.bind(new CreateTransferController()))
routes.route('/deposits')
    .post( new CreateDepositController().handle.bind(new CreateDepositController()))
routes.route('/withdraws')
    .post( new CreateWithdrawController().handle.bind(new CreateWithdrawController()))

export { routes }