import * as dotenv from 'dotenv'

dotenv.config()

const config = {
    PORT: process.env.PORT,
    URL: process.env.DATABASE_URL
}

export { config }
