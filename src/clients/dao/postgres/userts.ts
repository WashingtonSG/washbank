import { PostgresDB } from '.'
import { User } from '../../../models'

class UsersTable extends PostgresDB
{
    public async insert (user: User): Promise<boolean>
    {
        try
        {
            this.client.connect()

            const insertUserQuery = `
                INSERT INTO users (
                    id,
                    name,
                    email,
                    birthdate,
                    cpf
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5
                ) RETURNING id
            `

            const result = await this.client.query(insertUserQuery, [
                user.id,
                user.name,
                user.email,
                user.birthdate,
                user.cpf
            ])

            this.client.end()

            if (result.rows.length !== 0)
            {
                return true
            }

            return false
        }
        catch (error)
        {
            this.client.end()
            throw new Error('503: service temporarily unavailable')
        }
    }
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

export { UsersTable }
