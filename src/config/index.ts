import * as dotenv from 'dotenv'

dotenv.config()

const config = {
    PORT: process.env.PORT,
    URL: process.env.DATABASE_URL
}
const bankFees = {
    tranferFee: 1,
    depositTax: 0.01,
    withdrawFee: 4
}
export { config, bankFees }
