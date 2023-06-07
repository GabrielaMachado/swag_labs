import {
    LoginPage
} from "./pages/login_page"

var loginPage = new LoginPage()

describe('Login test', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Login locked out user', () => {

        loginPage.login('locked_out_user', 'secret_sauce')
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.')
    })

    it('Login standard user', () => {

        loginPage.login('standard_user', 'secret_sauce')
        cy.get('.title').should('contain.text', 'Products')
    })

})

beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    loginPage.login('standard_user', 'secret_sauce')
})
describe('Products page test', () => {


    it('Add product to car', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('have.text', 1)
        cy.get('.shopping_cart_link').click()
        cy.get('.inventory_item_name').should('contain.text', 'Sauce Labs Backpack')
    })

    it('Remove product to car', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]')
            .should('contain.text', 'Remove')
            .click()
        cy.get('.shopping_cart_badge').should('not.exist')
        cy.get('.inventory_item_name').should('contain.text', 'Sauce Labs Backpack')
    })

})

describe('Order test', () => {



    it('Generar order', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('.shopping_cart_badge').should('have.text', 2)
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Pedro')
        cy.get('[data-test="lastName"]').type('Pérez')
        cy.get('[data-test="postalCode"]').type('12345')
        cy.get('[data-test="continue"]').click()
        cy.get('.cart_list').children().should('have.length', 4)
        cy.get('[data-test="finish"]').click()
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
        cy.get('[data-test="back-to-products"]').click()
    })

    it('Generar order whit out products', () => {
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').should('be.disabled')
    })

})

describe('Products detail page test', () => {

 

    it('See product detail', () => {
        cy.get('#item_1_title_link > .inventory_item_name').click()
        cy.get('.inventory_details_desc').should('have.text', 'Get your testing superhero on with ' +
            'the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed ' +
            'cotton, heather gray with red bolt.')
        cy.get('[data-test="back-to-products"]').click()
        cy.get('.title').should('contain.text', 'Products')
    })

    it('Add product to cart', () => {
        cy.get('#item_2_title_link > .inventory_item_name').click()
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('.shopping_cart_badge').should('have.text', 1)
        cy.get('[data-test="remove-sauce-labs-onesie"]')
            .should('contain.text', 'Remove')
            cy.get('.shopping_cart_link').click()
        cy.get('.inventory_item_name').should('contain.text', 'Sauce Labs Onesie')
    })


})

describe('Cart page test', () => {

    

    it('Remove product to car', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('.inventory_item_name').should('contain.text', 'Sauce Labs Backpack')
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('not.exist')
        cy.get('.cart_list').children().should('have.length', 3)
    })

})
