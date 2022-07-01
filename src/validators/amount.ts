class AmountValidator
{
    public amount: number
    public errors: string

    public constructor (amount: number)
    {
        this.errors = ''
        this.amount = this.validate(amount)
    }

    private validate (amount: number): number
    {
        if (!amount) 
            return 0

        if (amount < 0) {
            this.errors += 'amount: amount must be positive|'
            return 0
        }
        return amount
    }
}

export { AmountValidator }
