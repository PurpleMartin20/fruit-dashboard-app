import { faker } from '@faker-js/faker';

describe('Fruit Api Test', () => {

  let getRandomPrice
  let getRandomName

  beforeEach(() => {
    cy.resetDB();

    getRandomPrice = faker.number.float({ min: 10, max: 100, multipleOf: 0.02 })
    getRandomName = faker.food.fruit()

    cy.request('POST', 'http://localhost:8000/fruits', {
      name: getRandomName,
      price: getRandomPrice,
      status: 0,
    })
  })




  it('Fruit Api Test - Add Fruit (status AVAILABLE)', () => {
    cy.request('POST', 'http://localhost:8000/fruits', {
      name: getRandomName,
      price: getRandomPrice,
      status: 0,
    }).then((response) => {

      expect(response.body).to.have.property('name', getRandomName)
      expect(response.body).to.have.property('price', getRandomPrice)
      expect(response.body).to.have.property('status', 0)
    })

  })

  it('Fruit Api Test - Add Fruit (Status RESERVED)', () => {
    cy.request('POST', 'http://localhost:8000/fruits', {
      name: getRandomName,
      price: getRandomPrice,
      status: 1,
    }).then((response) => {

      expect(response.body).to.have.property('name', getRandomName)
      expect(response.body).to.have.property('price', getRandomPrice)
      expect(response.body).to.have.property('status', 1)
    })

  })

  it('Fruit Api Test - Add Fruit (Status SOLD)', () => {
    cy.request('POST', 'http://localhost:8000/fruits', {
      name: getRandomName,
      price: getRandomPrice,
      status: 2,
    }).then((response) => {

      expect(response.body).to.have.property('name', getRandomName)
      expect(response.body).to.have.property('price', getRandomPrice)
      expect(response.body).to.have.property('status', 2)
    })

  })

  it('Fruit Api Test - Add Fruit (Status IDK)', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8000/fruits',
      failOnStatusCode: false,
      body: {
        name: getRandomName,
        price: getRandomPrice,
        status: 3,
      },
    })
      .its('status')
      .should('eq', 422)

  })




  it('Fruit Api Test - Add Fruit (No Name)', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8000/fruits',
      failOnStatusCode: false,
      body: {
        price: getRandomPrice,
        status: 0,
      },
    })
      .its('status')
      .should('eq', 422)

  })

  it('Fruit Api Test - Add Fruit (No Price)', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8000/fruits',
      failOnStatusCode: false,
      body: {
        name: getRandomName,
        status: 0,
      },
    })
      .its('status')
      .should('eq', 422)

  })


  it('Fruit Api Test - Add Fruit (No Status)', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8000/fruits',
      failOnStatusCode: false,
      body: {
        name: getRandomName,
        price: getRandomPrice,

      },
    }).then((response) => {

      expect(response.body).to.have.property('name', getRandomName)
      expect(response.body).to.have.property('price', getRandomPrice)
      expect(response.body).to.have.property('status', 0)
    })


  })




  it('Fruit Api Test - Buy Fruit', () => {
    cy.request({
      method: 'PATCH',
      url: 'http://localhost:8000/fruits/1/buy',
    })
      .its('status')
      .should('eq', 200)


  })

  it('Fruit Api Test - Buy Fruit (Wrong Fruit ID)', () => {
    cy.request({
      method: 'PATCH',
      url: 'http://localhost:8000/fruits/0/buy',
      failOnStatusCode: false,

    }).then((response) => {

      expect(response.status).to.eq(404)
      expect(response.body.detail).to.eq("Fruit not found")

    })

  })


  it('Fruit Api Test - Buy Fruit (Fruit Available)', () => {
    cy.request('POST', 'http://localhost:8000/fruits', {
      name: getRandomName,
      price: getRandomPrice,
      status: 1,
    })
    cy.request({
      method: 'PATCH',
      url: 'http://localhost:8000/fruits/2/buy',
      failOnStatusCode: false,

    }).then((response) => {

      expect(response.status).to.eq(400)
      expect(response.body.detail).to.eq("Fruit is not available")

    })

  })


  it('Fruit Api Test - Delete Fruit ', () => {
    cy.request('POST', 'http://localhost:8000/fruits', {
      name: getRandomName,
      price: getRandomPrice,
      status: 0,
    })
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:8000/fruits/2',
      failOnStatusCode: false,

    }).then((response) => {

      expect(response.body.message).to.eq("Fruit deleted successfully")

    })

  })

  it('Fruit Api Test - Delete Fruit (Wrong Fruit ID)', () => {
    cy.request('POST', 'http://localhost:8000/fruits', {
      name: getRandomName,
      price: getRandomPrice,
      status: 0,
    })
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:8000/fruits/3',
      failOnStatusCode: false,

    }).then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body.detail).to.eq("Fruit not found")

    })

  })


})