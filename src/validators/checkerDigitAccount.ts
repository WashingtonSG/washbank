class CheckerDigitAccountValidator
{
    public checkerDigitAccount: string
    public errors: string

    public constructor (checkerDigitAccount: string)
    {
        this.errors = ''
        this.checkerDigitAccount = this.validate(checkerDigitAccount)
    }

    private validate (checkerDigitAccount: string): string
    {
        if (!checkerDigitAccount)
        {
            this.errors += 'checkerDigitAccount:checkerDigitAccount required|'

            return ''
        }

        return checkerDigitAccount.trim()
    }
}

export { CheckerDigitAccountValidator }
