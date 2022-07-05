import { Account } from '.'

interface Transfer {
    amount: number
    senderAccount: Account & {cpf:string}
    receiverAccount: Account & {cpf:string}
}

export {Transfer}