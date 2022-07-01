class AgencyValidator
{
    public agency: string
    public errors: string
    public constructor (agency: string)
    {
        this.errors = ''
        this.agency = this.validate(agency)
    }

    private validate (agency: string): string
    {
        if (!agency)
        {
            this.errors += 'agency:agency required|AccountNumberValidator'

            return ''
        }

        return agency.trim()
    }
}

export { AgencyValidator }
