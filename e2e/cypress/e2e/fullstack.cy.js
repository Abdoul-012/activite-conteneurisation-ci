describe('Validation E2E fullstack', () => {
  it('affiche les utilisateurs récupérés depuis le vrai backend', () => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}/users`).as('getUsers')

    cy.visit('/')
    cy.contains('Fullstack React + FastAPI + MySQL')

    cy.wait('@getUsers').its('response.statusCode').should('eq', 200)
    cy.contains('API réelle connectée')
    cy.contains('Alice')
    cy.contains('Bob')
  })

  it('expose un endpoint /users fonctionnel', () => {
    cy.request(`${Cypress.env('apiUrl')}/users`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.utilisateurs).to.have.length.greaterThan(0)
    })
  })
})
