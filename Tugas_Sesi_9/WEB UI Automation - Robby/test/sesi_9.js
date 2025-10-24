const { Builder, By, until } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')
const assert = require('assert')

describe('Tugas Sesi 9', function () {
    let driver

    it('Visit web SauceDemo dan cek page title', async function () {
        driver = await new Builder().forBrowser('firefox').build()

        await driver.get('https://www.saucedemo.com/')

        const title = await driver.getTitle()
        assert.strictEqual(title, 'Swag Labs')
    })

    it('User sukses ketika Login', async function () {
        await driver.findElement(By.id('user-name')).sendKeys('standard_user')
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('secret_sauce')
        await driver.findElement(By.css('[data-test="login-button"]')).click()

        const currentUrl = await driver.getCurrentUrl()
        assert.ok(currentUrl.includes('inventory'), 'Login gagal, URL tidak sesuai')

        const menuButton = await driver.findElement(By.id('react-burger-menu-btn'))
        assert.strictEqual(await menuButton.isDisplayed(), true, 'Login gagal, tombol menu tidak terlihat')
    })

    it('User berhasil menggunakan menu Sorting (Z-A, low to high, high to low)', async function () {
        // === SORTING Z → A ===
        let sortDropdown = await driver.findElement(By.css('.product_sort_container'))
        await sortDropdown.sendKeys('Name (Z to A)')
        await driver.sleep(500)
        await driver.wait(until.elementsLocated(By.css('.inventory_item_name')), 5000)

        let productNameElements = await driver.findElements(By.css('.inventory_item_name'))
        let productNames = await Promise.all(productNameElements.map(el => el.getText()))
        let expectedNames = [...productNames].sort().reverse()

        console.log('\n=== Sorting Z → A ===')
        console.log('Actual:', productNames)
        console.log('Expected:', expectedNames)
        assert.deepStrictEqual(productNames, expectedNames, 'Sorting Z-A tidak sesuai')

        // === SORTING PRICE: LOW → HIGH ===
        sortDropdown = await driver.findElement(By.css('.product_sort_container')) // sekarang aman
        await sortDropdown.sendKeys('Price (low to high)')
        await driver.sleep(500)
        await driver.wait(until.elementsLocated(By.css('.inventory_item_price')), 5000)

        let priceElementsLow = await driver.findElements(By.css('.inventory_item_price'))
        let priceValuesLow = await Promise.all(priceElementsLow.map(async el => {
            return parseFloat((await el.getText()).replace('$', ''))
        }))
        let expectedLow = [...priceValuesLow].sort((a, b) => a - b)

        console.log('\n=== Sorting Price Low → High ===')
        console.log('Actual:', priceValuesLow)
        console.log('Expected:', expectedLow)
        assert.deepStrictEqual(priceValuesLow, expectedLow, 'Sorting Low→High tidak sesuai')

        // === SORTING PRICE: HIGH → LOW ===
        sortDropdown = await driver.findElement(By.css('.product_sort_container'))
        await sortDropdown.sendKeys('Price (high to low)')
        await driver.sleep(500)
        await driver.wait(until.elementsLocated(By.css('.inventory_item_price')), 5000)

        let priceElementsHigh = await driver.findElements(By.css('.inventory_item_price'))
        let priceValuesHigh = await Promise.all(priceElementsHigh.map(async el => {
            return parseFloat((await el.getText()).replace('$', ''))
        }))
        let expectedHigh = [...priceValuesHigh].sort((a, b) => b - a)

        console.log('\n=== Sorting Price High → Low ===')
        console.log('Actual:', priceValuesHigh)
        console.log('Expected:', expectedHigh)
        assert.deepStrictEqual(priceValuesHigh, expectedHigh, 'Sorting High→Low tidak sesuai')

        await driver.quit()
    })
})