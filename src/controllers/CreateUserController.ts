import { Request, Response } from 'express'
import { CreateUserService } from '../services'
import { ResponseWriter } from '../utils'
import { UsersTable } from '../clients/dao/postgres/userts'

class CreateUserController
{
    private userService = CreateUserService
    private responseWriter = ResponseWriter
    private usersTable = UsersTable

    public async handle (req: Request, res: Response)
    {
        try
        {
            const result = await new this.usersTable().findByCpf(req.body.cpf)
            const response = await new this.userService().execute(req.body)
            this.responseWriter.success(res, 201, response)
        }
        catch (err)
        {
            this.responseWriter.error(res, err as Error)
        }
    }
}

export { CreateUserController }
