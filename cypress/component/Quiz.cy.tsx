import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';
// import React from 'react';
// import questions from '../fixtures/questions.json';

describe('Quiz Component', () => {
    it('renders the "Start Quiz" button', () => {
        mount(<Quiz />);
        cy.contains('button', 'Start Quiz').should('be.visible');
    });
});