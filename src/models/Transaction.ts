interface Transaction {
    id:string
    senderAccount:string
    receiverAccount?:string
    amount:number
    fee:number
    total:number
    cod:string
}

export { Transaction }