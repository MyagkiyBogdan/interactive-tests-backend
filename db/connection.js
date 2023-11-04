import pgp from "pg-promise";
const db = pgp()("postgresql://postgres:qweqwe@localhost:5432/user_tests");

export default db;
