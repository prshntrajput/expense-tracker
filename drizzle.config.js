/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.jsx",
  driver: 'pg',
  dbCredentials: {
    connectionString:"postgresql://neondb_owner:qFeZDmbcA1p6@ep-orange-term-a52y0xo1.us-east-2.aws.neon.tech/expense-tracker?sslmode=require"
  }
};