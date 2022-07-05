import { Request, Response } from 'express'

import { CreateAccountService, CreateUserService } from '../services'
import { ResponseWriter } from '../utils'

class CreateAccountController
{
    private createAcountservice = CreateAccountService
    private responseWriter = ResponseWriter
    private createUserService = CreateUserService

    public async handle (req: Request, res: Response)
    {
        try
        {
            const userResponse = await new this.createUserService().execute(req.body.user)
           
            const accountResponse = await new this.createAcountservice()
                .execute(req.body.account, req.body.user.cpf)


            const response = {
                data: {
                    account: {...accountResponse.data},
                    user: {...userResponse.data}    
                },
                messages: accountResponse.messages.concat(userResponse.messages)
            }

            this.responseWriter.success(res, 201, response)

        }
        catch (err)
        {
            this.responseWriter.error(res, err as Error)
        }
    }
}

export { CreateAccountController }
