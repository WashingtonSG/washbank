import { PostgresDB } from '.'
import { Account } from '../../../models'

class AccountsTable extends PostgresDB
{
    public async insert (account: Account): Promise<boolean>
    {
        try
        {
            this.client.connect()
            const insertAccountQuery = `
                INSERT INTO accounts (
                    id,
                    agency,
                    checker_digit_agency,
                    checker_digit_account,
                    account_number,
                    balance,
                    user_id
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6,
                    $7
                ) RETURNING id
            `
            const result = await this.client.query(insertAccountQuery, [
                account.id,
                account.agency,
                account.checkerDigitAgency,
                account.checkerDigitAccount,
                account.accountNumber,
                account.balance,
                account.userId
            ])
            this.client.end()

            if (result.rows.length !== 0)
            {
                return true
            }

            return false
        }
        catch (error)
        {
            this.client.end()
            throw new Error('503: service temporarily unavailable ')
        }
    }
    public async findByAccountNumber (accountNumber: string) {
        try {

            this.client.connect()

            const searchQuery = `
                SELECT 
                    *
                FROM
                    accounts
                WHERE
                    account_number = $1
            `
            const result =  await this.client.query(searchQuery, [accountNumber])
            this.client.end()

            if (result.rows.length !== 0)
            {
                return true
            }

            return false
        }
        catch (error)
        {
            this.client.end()
            throw new Error('503: service temporarily unavailable ')
        }
    }
    public async updateAmount (accountNumber: string, amount:number) {
        try {

            this.client.connect()

            const updateAmount = `
                UPDATE 
                    accounts
                SET 
                    balance = balance + $2
                WHERE
                    account_number = $1
            `
            const result =  await this.client.query(updateAmount, 
                [accountNumber, amount]
            )
            this.client.end()
            if (result.rows.length !== 0)
            {
                return true
            }

            return false
        }
        catch (error)
        {
            console.log(error)
            this.client.end()
            throw new Error('503: service temporarily unavailable ')
        }
    }
}

export { AccountsTable }
