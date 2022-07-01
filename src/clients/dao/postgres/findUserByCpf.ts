import { PostgresDB } from '.'
import { User } from '../../../models'

class FindUserByCpf extends PostgresDB {
    public async search (cpf: string) : Promise<User | undefined> {
        try
        {
            this.client.connect()

            const findCpfQuery = 'SELECT * FROM users WHERE cpf = $1'
            
            const result = await this.client.query(findCpfQuery, [cpf])
            const user = result.rows[0]
            this.client.end()
            return user
        }
        catch (error)
        {
            this.client.end()
            throw new Error('503: service temporarily unavailable')
        }
    }
}

export { FindUserByCpf }