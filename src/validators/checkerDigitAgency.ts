class CheckerDigitAgencyValidator
{
    public checkerDigitAgency: string
    public errors: string

    public constructor (checkerDigitAgency: string)
    {
        this.errors = ''
        this.checkerDigitAgency = this.validate(checkerDigitAgency)
    }

    private validate (checkerDigitAgency: string): string
    {
        if (!checkerDigitAgency)
        {
            this.errors += 'checkerDigitAgency:checkerDigitAgency required|'

            return ''
        }

        return checkerDigitAgency.trim()
    }
}

export { CheckerDigitAgencyValidator }
