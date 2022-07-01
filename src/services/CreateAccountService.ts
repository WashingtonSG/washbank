import { v4 } from 'uuid'
import { AccountsTable } from '../clients/dao/postgres/accounts'
import { Account, APIResponse} from '../models'
import { ExceptionTreatment } from '../utils'
import { AccountDataValidator } from '../validators'


class CreateAccountService {
    private accountDataValidator = AccountDataValidator
    private accountsTable = AccountsTable

    async execute (account: Account): Promise<APIResponse> {
        try
        {
            const validAccountData = new this.accountDataValidator(account)
            // if (validAccountData.errors)
            // {
            //     throw new Error(`400: ${validAccountData.errors}`)
            // }

            validAccountData.account.id = v4()

            const insertedUser = await new this.accountsTable().insert(validAccountData.account as Account)

            if (insertedUser)
            {
                return {
                    data: validAccountData.account,
                    messages: []
                } as APIResponse
            }

            return {
                data: {},
                messages: [ 'an error occurred while creating user account' ]
            } as APIResponse
        }
        catch (error)
        {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while inserting user on database'
            )
        }
    }
}

export { CreateAccountService }