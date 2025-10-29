const { Builder } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const firefox = require('selenium-webdriver/firefox')
const assert = require('assert')
const { login } = require('./utils/login')

describe('Tugas Sesi 10', function () {
    let driver

    describe('Chrome', () => {
        beforeEach(async () => {
            driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('--headless')).build()
            await login(driver);
        })
        afterEach(() => driver.quit())

        it('sukses login ke web SauceDemo di browser Chrome', async () => {
            assert.ok((await driver.getCurrentUrl()).includes('inventory'))
        });
    });

    describe('Firefox', () => {
        beforeEach(async () => {
            driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().addArguments('-headless')).build()
            await login(driver)
        })
        afterEach(() => driver.quit())

        it('sukses login ke web SauceDemo di browser Firefox', async () => {
            assert.ok((await driver.getCurrentUrl()).includes('inventory'))
        })
    })
})