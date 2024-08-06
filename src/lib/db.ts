import postgres, { type Options } from "postgres";

const { NODE_ENV, PG_HOST, PG_DATABASE, PG_USER, PG_PASSWORD, ENDPOINT_ID } =
  process.env;

const postgresConfig: Options<any> = {
  host: PG_HOST,
  database: PG_DATABASE,
  username: PG_USER,
  port: 5432,
};

if (NODE_ENV !== "development") {
  postgresConfig.password = PG_PASSWORD;
  postgresConfig.ssl = "require";
  postgresConfig.connection = {
    options: `project=${ENDPOINT_ID}`,
  };
}

console.log({ postgresConfig });

export const sql = postgres(postgresConfig);

export const createDatabases = async () => {
  await sql`CREATE TABLE IF NOT EXISTS loans (
      id SERIAL NOT NULL PRIMARY KEY,
      cpf VARCHAR(255),
      uf VARCHAR(255),
      birthdate DATE,
      loan_amount DECIMAL(10, 2),
      desired_payment DECIMAL(10, 2)
    )`;
};
