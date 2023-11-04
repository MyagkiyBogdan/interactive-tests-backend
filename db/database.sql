CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role INT NOT NULL DEFAULT 1 CHECK (role = 1 OR role = 2)
);


create TABLE default_tests(
  id SERIAL PRIMARY KEY,
  test_name VARCHAR(255),
  first_answer VARCHAR(255),
  second_answer VARCHAR(255),
  third_answer VARCHAR(255),
  fourth_answer VARCHAR(255),
  fifth_answer VARCHAR(255),
  sixth_answer VARCHAR(255),
  correct_answer INTEGER
);



SELECT table_name, column_name, data_type, character_maximum_length, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_catalog = 'user_tests'
ORDER BY table_name, ordinal_position;

SELECT * FROM users;

DELETE FROM users;