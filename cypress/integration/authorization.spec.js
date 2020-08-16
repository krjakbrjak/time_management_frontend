/// <reference types="Cypress" />

import { AUTH_API, SESSION_API } from '../../src/helpers/endpoints';

describe('Authorization', () => {
    it('Displays the message in the list', () => {
        cy.server();
        // Fake GET SESSION request => not authorized
        cy.route({
            method: 'GET',
            url: SESSION_API,
            status: 401,
            response: {}
        })
        cy.visit('http://localhost:9000');

        cy.get('[data-testid="username"]')
            .type('admin');

        cy.get('[data-testid="username"]').should('be').eq(null);
        cy.get('[data-testid="password"]')
            .type('password');

        // Fake POST credentials request => successfully logged in
        cy.route({
            method: 'POST',
            url: AUTH_API,
            response: {
                'username': 'user'
            }
        })
        cy.get('[data-testid="login"]')
            .click()
            .wait(1000)
            .should('not.exist');

        cy.get('[data-testid="username"]').should('not.exist')
        cy.get('[data-testid="password"]').should('not.exist')
    });
});
