import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"
const sql = neon("postgresql://neondb_owner:qFeZDmbcA1p6@ep-orange-term-a52y0xo1.us-east-2.aws.neon.tech/expense-tracker?sslmode=require");
const db = drizzle(sql,{schema});