export class ProductsPage {

    username_txt = '[data-test="username"]'
    password_txt = '[data-test="password"]'
    add_btn = '[data-test="add-to-cart-sauce-labs-backpack"]'
    cart_btn = '.shopping_cart_link'

    login(userName, password) {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
        cy.get(this.username_txt).type(userName)
        cy.get(this.password_txt).type(password)
        cy.get(this.cart_btn).click()
        cy.get(this.add_btn).click()
    }

}