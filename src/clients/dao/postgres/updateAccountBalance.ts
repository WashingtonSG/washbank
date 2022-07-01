import { PostgresDB } from '.'

class FindUserByCpf extends PostgresDB {
    public async search (total:number, accountNumber: string) : Promise<number> {
        try
        {
            this.client.connect()

            const update = 
            `UPDATE 
                accounts
            SET
                balance = balance + $1
                WHERE 
                    account_number = $2`
            
            const result = await this.client.query(update, [total, accountNumber])
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