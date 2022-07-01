import { Request, Response } from 'express'

import { CreateAccountService, CreateUserService, FindUserByCpfService } from '../services'
import { ResponseWriter } from '../utils'

class CreateAccountController
{
    private createAcountservice = CreateAccountService
    private responseWriter = ResponseWriter
    private findUserByCpfService = FindUserByCpfService
    private createUserService = CreateUserService

    public async handle (req: Request, res: Response)
    {
        try
        {
            const userExists = await new this.findUserByCpfService().execute(req.body.user.cpf)
            const accountResponse = await new this.createAcountservice().execute(req.body.account)

            if(!userExists){
                const userResponse = await new this.createUserService().execute(req.body.user)
                const finalResponse = {
                    data: {account: accountResponse.data, user: userResponse.data},
                    messages: userResponse.messages.concat(accountResponse.messages)
                }
                
                this.responseWriter.success(res, 201, finalResponse)
            }
            else
                this.responseWriter.success(res, 201, accountResponse)
        }
        catch (err)
        {
            this.responseWriter.error(res, err as Error)
        }
    }
}

export { CreateAccountController }
