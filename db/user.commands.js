export const createUserQuery = `
  INSERT INTO users (name, surname, email, password, role)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id, name, surname, email, role;
`;

export const getUserByEmail = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
