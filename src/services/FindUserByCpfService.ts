import { UsersTable } from '../clients/dao/postgres/userts'
import { ExceptionTreatment } from '../utils'
import { User } from '../models'

class FindUserByCpfService {
    private usersTable = UsersTable
    async execute (cpf: string):Promise<User> {
        try {
            console.log('aaaaaaaaaaaaaaaaa')
            const user = await new this.usersTable().search(cpf)
            return user
        } catch (error) {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while search user on database'
            )
        }
    }
}

export { FindUserByCpfService }