class AccountDigit {
    generate(accountNumber:string): string {
        
        const numbers = Array.from(accountNumber)
        let sum = 0

        for (let i = 0; i < numbers.length; i++) {

            const digit = numbers[i]
            sum += parseInt(digit)
        }
        const result = sum / (sum *10) 
        const accountDigit = String(result)

        return accountDigit.slice(-1)
    }
}

export { AccountDigit }