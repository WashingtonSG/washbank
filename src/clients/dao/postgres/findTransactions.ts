import { PostgresDB } from '.'
import { Transaction, User } from '../../../models'

class FindTransactionsByAccountNumber extends PostgresDB {
    public async search (sender_account: string) : Promise<Transaction[]> {
        try
        {
            this.client.connect()

            const findTransactionsQuery = 
            `SELECT
                id AS TransactionId,
                sender_account AS userAccount,
                receiver_account AS receiverAccount,
                amount ,
                fee,
                cod 
            FROM 
                transactions 
            WHERE 
                sender_account = $1`
            
            const result = await this.client.query(findTransactionsQuery, [sender_account])
            const transactions = result.rows
            this.client.end()
            return transactions
        }
        catch (error)
        {
            this.client.end()
            throw new Error('503: service temporarily unavailable')
        }
    }
}

export { FindTransactionsByAccountNumber }