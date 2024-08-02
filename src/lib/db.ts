import pg from "pg";
const { Pool } = pg;

const { NODE_ENV, DB_URI, DB_USER, DB_PASSWORD } = process.env;

type PoolConfig = {
  host: string;
  port: number;
  database: string;
  user: string;
  password?: string;
  ssl?: {
    require: boolean;
    rejectUnauthorized: boolean;
  };
};

const poolConfig: PoolConfig = {
  host: DB_URI,
  port: 5432,
  database: "postgres",
  user: DB_USER,
};

if (NODE_ENV !== "development") {
  poolConfig.password = DB_PASSWORD;
  poolConfig.ssl = {
    rejectUnauthorized: false,
    require: true,
  };
}

const pool = new Pool(poolConfig);

export const query = (text: string, params?: any) => pool.query(text, params);

export const createDatabases = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS loans (
      id SERIAL NOT NULL PRIMARY KEY,
      cpf VARCHAR(255),
      uf VARCHAR(255),
      birthdate DATE,
      loan_amount DECIMAL(10, 2),
      desired_payment DECIMAL(10, 2)
    );
  `);
};
