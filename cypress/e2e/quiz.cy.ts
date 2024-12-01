describe("Tech Quiz End to End", () => {
  beforeEach(() => {
    cy.fixture("questions.json").then((questions) => {
      cy.intercept("GET", "/api/questions/random", { body: questions }).as(
        "getQuestions"
      );
    });
  });

  it("allows a user to complete the quiz and view their score", () => {
    cy.visit("http://localhost:3001");
    cy.contains("Start Quiz").click();

    // Mock questions
    const questionAnswerMap: Record<string, string> = {
      "What is the output of print(2 ** 3)?": "8",
      "Which of the following is a mutable data type in Python?": "list",
      "What is the keyword used to define a function in Python?": "def",
      "Which of the following is used to create an empty set?": "set()",
      "What is the output of len('hello world')?": "11",
      "Which method is used to remove whitespace from the beginning and end of a string?":
        "strip()",
      "What does the // operator do in Python?": "Performs integer division",
      "Which of the following is a valid variable name in Python?":
        "variable_1",
      "What is the output of type(3.14)?": "<class 'float'>",
      "Which of the following statements is used to handle exceptions in Python?":
        "except",
    };

    Object.entries(questionAnswerMap).forEach(([question, answer]) => {
      cy.get("h2")
        .should("be.visible")
        .then(($question) => {
          const currentQuestion = $question.text().trim();

          if (currentQuestion !== question) {
            throw new Error(`Expected question: "${question}" Actual question: "${currentQuestion}"`);
          }

          // Locate the parent div containing the correct answer text
          cy.get('.d-flex.align-items-center')
            .contains(answer) // Find the div with the correct answer text
            .parent()
            .find('button')
            .should('be.visible')
            .click();
        });
    });

    cy.contains("Quiz Completed").should("be.visible");
    cy.get(".alert.alert-success").should("contain.text", "Your score: 10/10");
    cy.contains("Take New Quiz")
  });
});
