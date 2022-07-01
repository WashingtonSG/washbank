import {
    BalanceValidator,
    AgencyValidator,
    CheckerDigitAgencyValidator,
    CheckerDigitAccountValidator,
    AccountNumberValidator
} from '.'
import { Account } from '../models'

class AccountDataValidator
{
    public account: Partial<Account>
    public errors: string

    private balanceValidator = BalanceValidator
    private agencyValidator = AgencyValidator
    private checkerDigitAgencyValidator = CheckerDigitAgencyValidator
    private checkerDigitAccountValidator = CheckerDigitAccountValidator
    private accountNumberValidator = AccountNumberValidator

    public constructor (account: Account)
    {
        this.errors = ''
        this.account = this.validate(account)
    }

    private validate (account: Account): Partial<Account>
    {
        const validBalance = new this.balanceValidator(account.balance)
        const validAgency = new this.agencyValidator(account.agency)
        const validcheckerDigitAgency = new this.checkerDigitAgencyValidator(account.checkerDigitAgency)
        const validcheckerDigitAccount = new this.checkerDigitAccountValidator(account.checkerDigitAccount)
        const validAccountNumber = new this.accountNumberValidator(account.accountNumber)

        this.errors = this.errors.concat(`
            ${validBalance.errors}
            ${validAgency.errors}
            ${validcheckerDigitAgency.errors}
            ${validcheckerDigitAccount.errors}
            ${validAccountNumber.errors}
            `)

        const accountData: Partial<Account> = {
            accountNumber: validAccountNumber.accountNumber,
            agency: validAgency.agency,
            balance: validBalance.balance,
            checkerDigitAccount: validcheckerDigitAccount.checkerDigitAccount,
            checkerDigitAgency: validcheckerDigitAgency.checkerDigitAgency,
        }
        return accountData
    }
}

export { AccountDataValidator }
