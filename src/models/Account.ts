interface Account {
    id?:string
    userId:string
    agency:string
    checkerDigitAgency:string
    checkerDigitAccount:string
    accountNumber:string
    balance:number
    password:string
}

export { Account }