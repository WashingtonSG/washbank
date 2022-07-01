import { Request, Response } from 'express'
import { CreateUserService } from '../services'
import { ResponseWriter } from '../utils'
import { FindUserByCpf } from '../clients/dao/postgres/findUserByCpf'

class CreateUserController
{
    private userService = CreateUserService
    private responseWriter = ResponseWriter
    private findUserByCpfService = FindUserByCpf
    public async handle (req: Request, res: Response)
    {
        try
        {
            //const result = await new findUserByCpf().search(cpf)
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
