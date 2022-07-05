import { TransactionsTable } from '../clients/dao/postgres/transactions'
import { ExceptionTreatment } from '../utils'
import { APIResponse } from '../models'

class ListTransactionsService {

    async execute (accountNumber: string):Promise<APIResponse> {
        try {
            const transactions = await new TransactionsTable().findByAccountNumber(accountNumber)

            if(transactions)
            {
                return {
                    data: transactions,
                    messages: []
                } as APIResponse
            }
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