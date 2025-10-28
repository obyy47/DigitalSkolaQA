const { Builder, By, until } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')
const assert = require('assert')

describe('Tugas Sesi 9', function () {
    let driver

    it('Visit web SauceDemo dan cek page title', async function () {
        driver = await new Builder().forBrowser('firefox').build()
        await driver.get('https://www.saucedemo.com/')

        await driver.findElement(By.id('user-name')).sendKeys('standard_user')
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('secret_sauce')
        await driver.findElement(By.css('[data-test="login-button"]')).click()

        const title = await driver.getTitle()
        assert.strictEqual(title, 'Swag Labs')

        await driver.quit()
    })

    it('User sukses ketika Login', async function () {
        driver = await new Builder().forBrowser('firefox').build()
        await driver.get('https://www.saucedemo.com/')

        await driver.findElement(By.id('user-name')).sendKeys('standard_user')
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('secret_sauce')
        await driver.findElement(By.css('[data-test="login-button"]')).click()

        const currentUrl = await driver.getCurrentUrl()
        assert.ok(currentUrl.includes('inventory'), 'Login gagal, URL tidak sesuai')

        const menuButton = await driver.findElement(By.id('react-burger-menu-btn'))
        assert.strictEqual(await menuButton.isDisplayed(), true, 'Login gagal, tombol menu tidak terlihat')

        await driver.quit()
    })

    it('User berhasil menggunakan menu Sorting (Z-A, low to high, high to low)', async function () {
        driver = await new Builder().forBrowser('firefox').build()
        await driver.get('https://www.saucedemo.com/')

        await driver.findElement(By.id('user-name')).sendKeys('standard_user')
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('secret_sauce')
        await driver.findElement(By.css('[data-test="login-button"]')).click()

        const getProductNames = async () => {
            const elements = await driver.findElements(By.css('.inventory_item_name'))
            return Promise.all(elements.map(el => el.getText()))
        }

        const getProductPrices = async () => {
            const elements = await driver.findElements(By.css('.inventory_item_price'))
            return Promise.all(elements.map(async el => parseFloat((await el.getText()).replace('$', ''))))
        }

        const selectSorting = async (optionText) => {
            const sortDropdown = await driver.findElement(By.css('.product_sort_container'))
            await sortDropdown.sendKeys(optionText)
            await driver.sleep(500)
        }

        // Z -> A
        await selectSorting('Name (Z to A)')
        const productNamesZA = await getProductNames()
        const expectedZA = [...productNamesZA].sort().reverse()

        assert.deepStrictEqual(productNamesZA, expectedZA, 'Sorting Z-A tidak sesuai')

        // PRICE LOW -> HIGH
        await selectSorting('Price (low to high)')
        const pricesLow = await getProductPrices()
        const expectedLow = [...pricesLow].sort((a, b) => a - b)

        assert.deepStrictEqual(pricesLow, expectedLow, 'Sorting Low→High tidak sesuai')

        // PRICE HIGH -> LOW
        await selectSorting('Price (high to low)')
        const pricesHigh = await getProductPrices()
        const expectedHigh = [...pricesHigh].sort((a, b) => b - a)

        assert.deepStrictEqual(pricesHigh, expectedHigh, 'Sorting High→Low tidak sesuai')

        await driver.quit()
    })
})