import { mount } from 'cypress/react';
import Quiz from "../../client/src/components/Quiz";


describe("Quiz Component", () => {
  it('renders the "Start Quiz" button', () => {
    mount(<Quiz />)
    cy.fixture("questions.json").then((questions) => {
        cy.intercept("GET", "/api/questions/random", { body: questions }).as(
          "getQuestions"
        );
      });
    cy.contains("Start Quiz").click();
    for (let i = 0; i < 10; i++) {
        cy.get(".btn-primary")
          .filter(":contains('4')")
          .first()
          .click();
    
        cy.wait(250);
      }
    
      cy.contains("Quiz Completed").should("be.visible");
  });
});
