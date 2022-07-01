import { PostgresDB } from '.'
import { Transaction } from '../../../models'

class TransactionsTable extends PostgresDB
{
    public async insert (transaction: Transaction): Promise<boolean>
    {
        try
        {
            this.client.connect()

            const insertTransactionQuery = `
                INSERT INTO transactions (
                    id,
                    sender_account,
                    receiver_account,
                    amount,
                    fee,
                    cod,
                    total
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6,
                    $7
                ) RETURNING id
            `

            const result = await this.client.query(insertTransactionQuery, [
                transaction.id,
                transaction.senderAccount,
                transaction.receiverAccount,
                transaction.amount,
                transaction.fee,
                transaction.cod,
                transaction.total
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
}

export { TransactionsTable }
