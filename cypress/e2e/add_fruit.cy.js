
import { faker } from '@faker-js/faker';

describe('Add Fruit ', () => {

  let getRandomPrice = faker.number.float({ min: 10, max: 100, multipleOf: 0.02 })
  let getRandomName = faker.person.firstName()

  beforeEach(() => {
    cy.resetDB();
  })



  it('ADD Fruit - Add Available Fruit', () => {
    cy.visit('http://localhost:8081/')

    cy.get('[placeholder="Fruit name"]').type(getRandomName);
    cy.get('[placeholder="Fruit price (e.g. 2.99)"]').type(getRandomPrice);
    cy.get('select').select('Available');
    cy.get('[data-testid="add-fruit-submit"]').click();

    cy.get('[testid="fruit-listing-1"]').should('be.visible')
    cy.get('[data-testid="fruit-status-1"]').should('have.text', "Available")
    cy.get('[testID="fruit-name-1"]').should('contain.text', getRandomName)
    cy.get('[testID="fruit-price-1"]').should('contain.text', getRandomPrice)
    cy.get('[data-testid="fruit-buy-1"]').should('have.attr', 'data-disabled', "false")


  })


  it('ADD Fruit - Add Reserved Fruit', () => {
    cy.visit('http://localhost:8081/')

    cy.get('[placeholder="Fruit name"]').type(getRandomName);
    cy.get('[placeholder="Fruit price (e.g. 2.99)"]').type(getRandomPrice);
    cy.get('select').select('Reserved');
    cy.get('[data-testid="add-fruit-submit"]').click();

    cy.get('[testid="fruit-listing-1"]').should('be.visible')
    cy.get('[data-testid="fruit-status-1"]').should('have.text', "Reserved")
    cy.get('[testID="fruit-name-1"]').should('contain.text', getRandomName)
    cy.get('[testID="fruit-price-1"]').should('contain.text', getRandomPrice)
    cy.get('[data-testid="fruit-buy-1"]').should('have.attr', 'data-disabled', "true")
  })



  it('ADD Fruit - Add Sold Fruit', () => {
    cy.visit('http://localhost:8081/')

    cy.get('[placeholder="Fruit name"]').type(getRandomName);
    cy.get('[placeholder="Fruit price (e.g. 2.99)"]').type(getRandomPrice);
    cy.get('select').select('Reserved');
    cy.get('[data-testid="add-fruit-submit"]').click();

    cy.get('[testid="fruit-listing-1"]').should('be.visible')
    cy.get('[data-testid="fruit-status-1"]').should('have.text', "Reserved")
    cy.get('[testID="fruit-name-1"]').should('contain.text', getRandomName)
    cy.get('[testID="fruit-price-1"]').should('contain.text', getRandomPrice)
    cy.get('[data-testid="fruit-buy-1"]').should('have.attr', 'data-disabled', "true")
  })

})