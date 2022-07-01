import { FindTransactionsByAccountNumber } from '../clients/dao/postgres/findTransactions'
import { ExceptionTreatment } from '../utils'
import { Transaction } from '../models'

class ListTransactionsService {

    async execute (accountNumber: string):Promise<Transaction[]> {
        try {
            const transactions = await new FindTransactionsByAccountNumber().search(accountNumber)
            return transactions
        } catch (error) {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while search transactions on database'
            )
        }
    }
}

export { ListTransactionsService }