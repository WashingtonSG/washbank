class CodValidator
{
    public cod: string
    public errors: string

    public constructor (cod: string)
    {
        this.errors = ''
        this.cod = this.validate(cod)
    }

    private validate (cod: string): string
    {
        if (!cod) {
            this.errors += 'cod: cod required|'
            return ''
        }

        if (cod !== '1' && cod !== '2' && cod !== '3') {
            this.errors += 'cod: cod invalid|'
            return ''
        }
        return cod.trim()
    }
}

export { CodValidator }
