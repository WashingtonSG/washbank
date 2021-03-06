import { APIResponse, User } from '../models'
import { ExceptionTreatment } from '../utils'
import { UserDataValidator } from '../validators'
import { UsersTable } from '../clients/dao/postgres/userts'
import { v4 } from 'uuid'

class CreateUserService {
    private userDataValidator = UserDataValidator
    private usersTable = UsersTable

    async execute (user: User) : Promise<APIResponse> {
        try
        {
            const userExists = await new this.usersTable().findByCpf(user.cpf)

            const validUserData = new this.userDataValidator(user)

            validUserData.user.id = v4()

            if (userExists){
                return {
                    data: {warning:'user already exists'},
                    messages: []
                } as APIResponse
            }

            if (validUserData.errors)
            {
                throw new Error(`400: ${validUserData.errors}`)
            }
            

            const insertedUser = await new this.usersTable().insert(validUserData.user as User)

            if (insertedUser)
            {
                return {
                    data: validUserData.user,
                    messages: []
                } as APIResponse
            }

            return {
                data: {},
                messages: [ 'an error occurred while creating user' ]
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

export { CreateUserService }