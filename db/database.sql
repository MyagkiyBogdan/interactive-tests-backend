CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role INT NOT NULL DEFAULT 1 CHECK (role = 1 OR role = 2)
);


CREATE TABLE single_answer_tests (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    correct_answer INT NOT NULL,
    options TEXT[] NOT NULL
);

CREATE TABLE multiple_choice_tests (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    correct_answers BOOLEAN[] NOT NULL,
    options TEXT[] NOT NULL
);

CREATE TABLE true_false_tests (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    correct_answer BOOLEAN NOT NULL
);

CREATE TABLE fill_in_the_blanks_tests (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    missing_word TEXT NOT NULL
);

CREATE TABLE sequencing_tests (
    id SERIAL PRIMARY KEY,
    question_order INT[] NOT NULL,
    question_text TEXT[] NOT NULL
);

CREATE TABLE matching_tests (
    id SERIAL PRIMARY KEY,
    questions TEXT[] NOT NULL,
    answers TEXT[] NOT NULL,
    matching JSONB NOT NULL
);

SELECT table_name, column_name, data_type, character_maximum_length, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_catalog = 'user_tests'
ORDER BY table_name, ordinal_position;

SELECT * FROM users;

DELETE FROM users;

DROP TABLE default_tests;
