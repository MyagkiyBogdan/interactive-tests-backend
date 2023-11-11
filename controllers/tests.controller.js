import db from "../db/connection.js";
import {
  createSingeAnswerTestQuery,
  createMultipleAnswerTestQuery,
  createTrueFalseTestQuery,
  createFillInTheBlanksTestQuery,
  createSequencingTestQuery,
  createMatchingTestQuery,
  addOrUpdateTestingResultQuery,
  getAllTestingResultsQuery,
} from "../db/tests.commands.js";

export const TEST_TYPE = {
  SINGLE_CHOICE_TEST: "1",
  MULTIPLE_CHOICE_TEST: "2",
  TRUE_FALSE_TEST: "3",
  FILL_IN_THE_BLANKS_TEST: "4",
  SEQUENCING_TEST: "5",
  MATCHING_TEST: "6",
};

export const getAllTests = async (req, res) => {
  try {
    const singleChoiceTests = await db.any("SELECT * FROM single_answer_tests");
    const multipleChoiceTests = await db.any(
      "SELECT * FROM multiple_choice_tests"
    );
    const trueFalseTests = await db.any("SELECT * FROM true_false_tests");
    const fillInTheBlanksTests = await db.any(
      "SELECT * FROM fill_in_the_blanks_tests"
    );
    const sequencingTests = await db.any("SELECT * FROM sequencing_tests");
    const matchingTests = await db.any("SELECT * FROM matching_tests");

    const tests = [
      ...singleChoiceTests.map((test) => ({
        type: TEST_TYPE.SINGLE_CHOICE_TEST,
        data: test,
      })),
      ...multipleChoiceTests.map((test) => ({
        type: TEST_TYPE.MULTIPLE_CHOICE_TEST,
        data: test,
      })),
      ...trueFalseTests.map((test) => ({
        type: TEST_TYPE.TRUE_FALSE_TEST,
        data: test,
      })),
      ...fillInTheBlanksTests.map((test) => ({
        type: TEST_TYPE.FILL_IN_THE_BLANKS_TEST,
        data: test,
      })),
      ...sequencingTests.map((test) => ({
        type: TEST_TYPE.SEQUENCING_TEST,
        data: test,
      })),
      ...matchingTests.map((test) => ({
        type: TEST_TYPE.MATCHING_TEST,
        data: test,
      })),
    ];

    return res.status(200).json(tests);
  } catch (error) {
    console.error("Ошибка при получении тестов:", error);
    return res.status(500).json("Ошибка при получении тестов");
  }
};

export const createSingleAnswerTest = async (req, res) => {
  const { question, correctAnswer, options } = req.body;
  try {
    if (
      !question ||
      correctAnswer === undefined ||
      !options ||
      options.length !== 4
    ) {
      return res.status(400).json("Помилка при створені тесту");
    }

    const values = [question, correctAnswer, options];

    const result = await db.one(createSingeAnswerTestQuery, values);
    if (result) {
      return res.status(200).json("Тест успішно створено");
    } else {
      return res.status(500).json("Помилка при створені тесту");
    }
  } catch (error) {
    console.error("Ошибка при создании теста:", error);
    return res.status(500).json("Помилка при створені тесту");
  }
};

export const createMultipleAnswerTest = async (req, res) => {
  const { question, correctAnswers, options } = req.body;
  try {
    if (
      !question ||
      !correctAnswers ||
      correctAnswers.length !== 4 ||
      !options ||
      options.length !== 4
    ) {
      return res.status(400).json("Помилка при створені тесту");
    }

    const values = [question, correctAnswers, options];

    const result = await db.one(createMultipleAnswerTestQuery, values);

    if (result) {
      return res.status(200).json("Тест успішно створено");
    } else {
      return res.status(500).json("Помилка при створені тесту");
    }
  } catch (error) {
    console.error("Ошибка при создании теста:", error);
    return res.status(500).json("Помилка при створені тесту");
  }
};

export const createTrueFalseTest = async (req, res) => {
  const { question, correctAnswer } = req.body;

  try {
    if (!question || correctAnswer === undefined) {
      return res.status(400).json("Помилка при створені тесту");
    }

    const values = [question, correctAnswer];

    const result = await db.one(createTrueFalseTestQuery, values);

    if (result) {
      return res.status(200).json("Тест успішно створено");
    } else {
      return res.status(500).json("Помилка при створені тесту");
    }
  } catch (error) {
    console.error("Ошибка при создании теста:", error);
    return res.status(500).json("Помилка при створені тесту");
  }
};

export const createFillInTheBlanksTest = async (req, res) => {
  const { question, missingWord } = req.body;

  try {
    if (!question || !missingWord) {
      return res.status(400).json("Помилка при створені тесту");
    }

    const values = [question, missingWord];

    const result = await db.one(createFillInTheBlanksTestQuery, values);

    if (result) {
      return res.status(200).json("Тест успішно створено");
    } else {
      return res.status(500).json("Помилка при створені тесту");
    }
  } catch (error) {
    console.error("Помилка при создании теста:", error);
    return res.status(500).json("Помилка при створені тесту");
  }
};

export const createSequencingTest = async (req, res) => {
  const { questions, order } = req.body;

  try {
    if (!questions || !order || questions.length !== order.length) {
      return res.status(400).json("Помилка при створені тесту");
    }

    const values = [order, questions];

    const result = await db.one(createSequencingTestQuery, values);

    if (result) {
      return res.status(200).json("Тест успішно створено");
    } else {
      return res.status(500).json("Помилка при створені тесту");
    }
  } catch (error) {
    console.error("Помилка при создании теста:", error);
    return res.status(500).json("Помилка при створені тесту");
  }
};

export const createMatchingTest = async (req, res) => {
  const { questions, answers, matching } = req.body;

  try {
    if (!questions || !answers || !matching) {
      return res
        .status(400)
        .json("Неправильный формат данных для создания теста");
    }

    const data = {
      questions,
      answers,
      matching,
    };

    const result = await db.one(createMatchingTestQuery, [
      data.questions,
      data.answers,
      data.matching,
    ]);

    if (result) {
      return res.status(200).json("Тест успешно создан");
    } else {
      return res.status(500).json("Ошибка при создании теста");
    }
  } catch (error) {
    console.error("Ошибка при создании теста:", error);
    return res.status(500).json("Ошибка при создании теста");
  }
};
export const addTestingResult = async (req, res) => {
  const { correctCount, results, username, userEmail } = req.body;

  try {
    if (!correctCount || !results || !username || !userEmail) {
      return res
        .status(400)
        .json(
          "Неправильный формат данных для добавления/обновления результата теста"
        );
    }

    const data = {
      correctCount,
      results,
      username,
      userEmail,
    };

    const result = await db.one(addOrUpdateTestingResultQuery, [
      data.correctCount,
      data.results,
      data.username,
      data.userEmail,
    ]);

    if (result) {
      return res.status(200).json("Результат успешно добавлен/обновлен");
    } else {
      return res
        .status(500)
        .json("Ошибка при добавлении/обновлении результата");
    }
  } catch (error) {
    console.error("Ошибка при добавлении/обновлении результата:", error);
    return res.status(500).json("Ошибка при добавлении/обновлении результата");
  }
};

export const getAllTestingResults = async (req, res) => {
  try {
    const results = await db.any(getAllTestingResultsQuery);

    return res.status(200).json(results);
  } catch (error) {
    console.error("Ошибка при получении результатов:", error);
    return res.status(500).json("Ошибка при получении результатов");
  }
};
