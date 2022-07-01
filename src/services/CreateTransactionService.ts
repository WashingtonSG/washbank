import { APIResponse, Transaction } from '../models'
import { ExceptionTreatment } from '../utils'
import { TransactionDataValidator } from '../validators'
import { TransactionsTable } from '../clients/dao/postgres/transactions'
import { v4 } from 'uuid'

class CreateTransactionService {
    private transactionDataValidator = TransactionDataValidator
    private transactionsTable = TransactionsTable
    private WITHDRAWCOD = '2'
    private TRANSFERCOD = '3'
    private TAX = 0.01
    async execute (transaction: Transaction) : Promise<APIResponse> {
        try
        {
            const validTransactionData = new this.transactionDataValidator(transaction)

            // if (validTransactionData.errors)
            // {
            //     throw new Error(`400: ${validTransactionData.errors}`)
            // }

            if(validTransactionData.transaction.cod === this.WITHDRAWCOD)
                validTransactionData.transaction.fee = 4

            else if(validTransactionData.transaction.cod === this.TRANSFERCOD) {
                validTransactionData.transaction.fee = 
                validTransactionData.transaction.amount * this.TAX
            }
            if(validTransactionData.transaction.cod !== '0')
                validTransactionData.transaction.total = 
                - (validTransactionData.transaction.amount 
                + validTransactionData.transaction.fee)
            else
                validTransactionData.transaction.total = 
                (validTransactionData.transaction.amount 
                + validTransactionData.transaction.fee)

            validTransactionData.transaction.id = v4()

            const insertedTransaction = await new this.transactionsTable().insert(validTransactionData.transaction as Transaction)

            if (insertedTransaction)
            {
                return {
                    data: validTransactionData.transaction,
                    messages: []
                } as APIResponse
            }

            return {
                data: {},
                messages: [ 'an error occurred while creating transaction' ]
            } as APIResponse
        }
        catch (error)
        {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while inserting transaction on database'
            )
        }
    }
}

export { CreateTransactionService }