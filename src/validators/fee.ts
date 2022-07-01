class FeeValidator
{
    public fee: number
    public errors: string

    public constructor (fee: number)
    {
        this.errors = ''
        this.fee = this.validate(fee)
    }

    private validate (fee: number): number
    {
        if (!fee) 
            return 0

        if (fee < 0) {
            this.errors += 'fee: fee must be positive|'
            return 0
        }
        return fee
    }
}

export { FeeValidator }
