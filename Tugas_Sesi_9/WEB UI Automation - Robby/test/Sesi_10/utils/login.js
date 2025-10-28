const { By, until } = require('selenium-webdriver')

async function login(driver) {
    await driver.get('https://www.saucedemo.com/')
    await driver.findElement(By.id('user-name')).sendKeys('standard_user')
    await driver.findElement(By.id('password')).sendKeys('secret_sauce')
    await driver.findElement(By.id('login-button')).click()
    await driver.wait(until.urlContains('inventory'), 10000)
}

module.exports = { login }