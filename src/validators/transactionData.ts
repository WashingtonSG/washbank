import {
    AccountNumberValidator,
    AmountValidator,
    CodValidator,
    FeeValidator,
} from '.'
import { Transaction } from '../models'

class TransactionDataValidator
{
    public transaction: Partial<Transaction>
    public errors: string

    private senderAccountValidator = AccountNumberValidator
    private receiverAccountValidator = AccountNumberValidator
    private amountValidator = AmountValidator
    private codValidator = CodValidator
    private feeValidator = FeeValidator

    public constructor (transaction: Transaction)
    {
        this.errors = ''
        this.transaction = this.validate(transaction)
    }

    private validate (transaction: Transaction): Partial<Transaction>
    {
        const validAmount = new this.amountValidator(transaction.amount)
        const validReceiverAccount = new this.receiverAccountValidator(transaction.receiverAccount)
        const validCod = new this.codValidator(transaction.cod)
        const validSenderAccount = new this.senderAccountValidator(transaction.userAccount)

        this.errors = this.errors.concat(`
            ${validAmount.errors}
            ${validReceiverAccount.errors}
            ${validCod.errors}
            ${validSenderAccount.errors}
            `)

        const accountData: Partial<Transaction> = {
            userAccount: validSenderAccount.accountNumber,
            receiverAccount: validReceiverAccount.accountNumber,
            amount: validAmount.amount,
            cod: validCod.cod,
        }
        return accountData
    }
}

export { TransactionDataValidator }
