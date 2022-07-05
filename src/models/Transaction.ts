interface Transaction {
    id:string
    userAccount:string
    receiverAccount?:string
    amount:number
    fee:number
    cod:string
    total:number
}

export { Transaction }