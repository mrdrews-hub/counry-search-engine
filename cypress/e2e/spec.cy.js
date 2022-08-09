describe('My First Test', () => {
  it('Visit Homepage', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.contains('Country')
  })
  it('should take input from the user', () => {
    cy.get('input')
      .type('indonesia')
      .should('have.value', 'indonesia')
  })
  it('should show country based from user input', async() => {
      cy.get('a').click()
      .then(() => {
        cy.url().should('include', '/details/Indonesia')
        cy.contains('Indonesia')
      })
  })
})
describe('my second tes', () => {
  it('visit detail page', () => {
    cy.visit('http://127.0.0.1:5173/details/Indonesia')
    cy.contains('Indonesia')
    cy.contains('Currency')
  })
  it('can back to homepage', () => {
    cy.get('[href="/"]')
    .click()
    .then(() => {
      cy.contains('Country')
    })
  })
})