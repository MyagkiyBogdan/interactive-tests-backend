export const createSingeAnswerTestQuery = `INSERT INTO single_answer_tests (question, correct_answer, options)
VALUES ($1, $2, $3)
RETURNING id;`;

export const createMultipleAnswerTestQuery = `
INSERT INTO multiple_choice_tests (question, correct_answers, options)
VALUES ($1, $2, $3)
RETURNING id;
`;

export const createTrueFalseTestQuery = `
  INSERT INTO true_false_tests (question, correct_answer)
  VALUES ($1, $2)
  RETURNING id;
`;

export const createFillInTheBlanksTestQuery = `
  INSERT INTO fill_in_the_blanks_tests (question, missing_word)
  VALUES ($1, $2)
  RETURNING id;
`;

export const createSequencingTestQuery = `
  INSERT INTO sequencing_tests (question_order, question_text)
  VALUES ($1, $2)
  RETURNING id;
`;

export const createMatchingTestQuery = `
  INSERT INTO matching_tests (questions, answers, matching)
  VALUES ($1, $2, $3)
  RETURNING id;
`;

export const addOrUpdateTestingResultQuery = `
  INSERT INTO testing_results (correctCount, results, username, userEmail)
  VALUES ($1, $2, $3, $4)
  ON CONFLICT (userEmail) DO UPDATE
  SET correctCount = EXCLUDED.correctCount,
      results = EXCLUDED.results,
      username = EXCLUDED.username
  RETURNING id;
`;

export const getAllTestingResultsQuery = `
  SELECT correctCount, results, username, userEmail FROM testing_results;
`;
