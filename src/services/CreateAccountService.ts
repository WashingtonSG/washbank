import { v4 } from 'uuid'
import { AccountsTable } from '../clients/dao/postgres/accounts'
import { Account,APIResponse} from '../models'
import { ExceptionTreatment, AccountDigit, AccountNumber } from '../utils'
import { AccountDataValidator } from '../validators'
import { UsersTable } from '../clients/dao/postgres/userts'
import { hash } from 'bcrypt'

class CreateAccountService {
    private accountDataValidator = AccountDataValidator
    private accountsTable = AccountsTable
    private usersTable = UsersTable
    private accountNumber = AccountNumber
    private accountDigit = AccountDigit
    async execute (account: Account, cpf:string): Promise<APIResponse> {
        try
        {
            const validAccountData = new this.accountDataValidator(account)
    
            const user = await new this.usersTable().findByCpf(cpf)

            validAccountData.account.id = v4()

            validAccountData.account.password = hash(validAccountData.account.password)

            validAccountData.account.accountNumber = new this.accountNumber().generate()

            validAccountData.account.checkerDigitAccount = 
                new this.accountDigit().generate(validAccountData.account.accountNumber)

            validAccountData.account.userId = user.id
            

            if (validAccountData.errors)
            {
                throw new Error(`400: ${validAccountData.errors}`)
            }

            const insertedAccount = await new this.accountsTable().insert(validAccountData.account as Account)

            delete validAccountData.account.password

            delete validAccountData.account.userId

            if (insertedAccount)
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
                'an error occurred while inserting account on database'
            )
        }
    }
}

export { CreateAccountService }