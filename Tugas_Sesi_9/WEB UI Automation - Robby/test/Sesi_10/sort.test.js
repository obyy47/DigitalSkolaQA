const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const firefox = require('selenium-webdriver/firefox')
const assert = require('assert')
const { login } = require('./utils/login')

describe('Sorting Z to A', function () {
    let driver

    describe('Chrome', () => {
        beforeEach(async () => {
            driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('--headless')).build()
            await login(driver)
        })
        afterEach(() => driver.quit())

        it('urutan Z -> A benar', async () => {
            await driver.findElement(By.css('.product_sort_container')).sendKeys('Name (Z to A)')
            await driver.sleep(500)
            const names = await Promise.all((await driver.findElements(By.css('.inventory_item_name'))).map(el => el.getText()))
            const expected = [...names].sort().reverse()
            assert.deepStrictEqual(names, expected)
        })
    })

    describe('Firefox', () => {
        beforeEach(async () => {
            driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().addArguments('-headless')).build()
            await login(driver)
        })
        afterEach(() => driver.quit())

        it('urutan Z -> A benar', async () => {
            await driver.findElement(By.css('.product_sort_container')).sendKeys('Name (Z to A)')
            await driver.sleep(500)
            const names = await Promise.all((await driver.findElements(By.css('.inventory_item_name'))).map(el => el.getText()))
            const expected = [...names].sort().reverse()
            assert.deepStrictEqual(names, expected)
        })
    })
})