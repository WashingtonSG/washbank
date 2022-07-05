class AccountNumber {
    generate():string {
        let accountNumber = ''

        for (let i = 0; i < 20; i++) {
            const digit = String( Math.floor(Math.random() * 10))
            accountNumber = accountNumber.concat(digit)
        }
        return accountNumber
    }
}

export { AccountNumber }