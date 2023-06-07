export class LoginPage {

    username_txt = '[data-test="username"]'
    password_txt = '[data-test="password"]'
    login_btn = '[data-test="login-button"]'

    login(userName, password) {
        cy.get(this.username_txt).type(userName)
        cy.get(this.password_txt).type(password)
        cy.get(this.login_btn).click()
    }

}