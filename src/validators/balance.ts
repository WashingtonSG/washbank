class BalanceValidator
{
    public balance: number
    public errors: string

    public constructor (balance: number)
    {
        this.errors = ''
        this.balance = this.validate(balance)
    }

    private validate (balance: number): number
    {
        if (!balance) 
            return 0

        if (balance < 0) {
            this.errors += 'balance: balance must be positive|'
            return 0
        }
        return balance
    }
}

export { BalanceValidator }
