/// <reference types="Cypress" />

describe('Creating a message', () => {
    it('Displays the message in the list', () => {
        cy.visit('http://localhost:9000');

        cy.get('[data-testid="username"]')
            .type('admin');

        cy.get('[data-testid="username"]').should('be').eq(null);
        cy.get('[data-testid="password"]')
            .type('password');

        cy.get('[data-testid="login"]')
            .click()
            .wait(1000)
            .should('not.exist');

        cy.get('[data-testid="username"]').should('not.exist')
        cy.get('[data-testid="password"]').should('not.exist')
    });
});
