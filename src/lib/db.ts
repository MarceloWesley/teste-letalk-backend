import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "letalk",
  user: "admin",
});

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
