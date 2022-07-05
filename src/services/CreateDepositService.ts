import { APIResponse, Transaction } from '../models'
import { ExceptionTreatment } from '../utils'
import { TransactionDataValidator } from '../validators'
import { TransactionsTable } from '../clients/dao/postgres/transactions'
import { v4 } from 'uuid'
import { bankFees } from '../config'
import { AccountsTable } from '../clients/dao/postgres/accounts'

class CreateDepositService {
    private transactionDataValidator = TransactionDataValidator
    private transactionsTable = TransactionsTable
    private accountsTable = AccountsTable

    async execute (transaction: Transaction) : Promise<APIResponse> {
        try
        {
            const validTransactionData = new this.transactionDataValidator(transaction)
            validTransactionData.transaction.id = v4()

            validTransactionData.transaction.fee = 
                bankFees.depositTax * validTransactionData.transaction.amount
                
            if (validTransactionData.errors)
            {
                throw new Error(`400: ${validTransactionData.errors}`)
            }

            const insertedTransaction = await new this.transactionsTable().insert(validTransactionData.transaction as Transaction)
            
            await  new this.accountsTable().updateAmount(
                validTransactionData.transaction.receiverAccount,
                validTransactionData.transaction.amount
            )
            
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

export { CreateDepositService }