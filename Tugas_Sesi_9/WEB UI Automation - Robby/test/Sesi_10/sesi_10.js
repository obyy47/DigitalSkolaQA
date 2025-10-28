// const { Builder, By, until } = require('selenium-webdriver')
// const chrome = require('selenium-webdriver/chrome')
// const firefox = require('selenium-webdriver/firefox')
// const assert = require('assert')

// describe('Tugas Sesi 10', function () {
//     let driver

//     const login = async () => {
//         await driver.get('https://www.saucedemo.com/')
//         await driver.findElement(By.id('user-name')).sendKeys('standard_user')
//         await driver.findElement(By.id('password')).sendKeys('secret_sauce')
//         await driver.findElement(By.id('login-button')).click()
//     }

//     // Chrome
//     describe('Browser CHROME', () => {
//         beforeEach(async () => {
//             const options = new chrome.Options().addArguments('--headless')
//             driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
//             await login()
//         })

//         afterEach(async () => {
//             await driver.quit()
//         })

//         it('User sukses login di Chrome', async () => {
//             const currentUrl = await driver.getCurrentUrl()
//             assert.ok(currentUrl.includes('inventory'), 'Login gagal')
//         })

//         it('User berhasil mengurutkan produk dari Z -> A', async () => {
//             const sortDropdown = await driver.findElement(By.css('.product_sort_container'))
//             await sortDropdown.sendKeys('Name (Z to A)')
//             await driver.sleep(500)

//             const productNames = await driver.findElements(By.css('.inventory_item_name'))
//             const names = await Promise.all(productNames.map(el => el.getText()))

//             const expected = [...names].sort().reverse()
//             assert.deepStrictEqual(names, expected, 'Urutan produk Z-A tidak sesuai')
//         })
//     })

//     // Firefox
//     describe('Browser FIREFOX', () => {
//         beforeEach(async () => {
//             const options = new firefox.Options().addArguments('-headless')
//             driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build()
//             await login()
//         })

//         afterEach(async () => {
//             await driver.quit()
//         })

//         it('User sukses login di Firefox', async () => {
//             const currentUrl = await driver.getCurrentUrl()
//             assert.ok(currentUrl.includes('inventory'), 'Login gagal')
//         })

//         it('User berhasil mengurutkan produk dari Z -> A', async () => {
//             const sortDropdown = await driver.findElement(By.css('.product_sort_container'))
//             await sortDropdown.sendKeys('Name (Z to A)')
//             await driver.sleep(500)

//             const productNames = await driver.findElements(By.css('.inventory_item_name'))
//             const names = await Promise.all(productNames.map(el => el.getText()))

//             const expected = [...names].sort().reverse()
//             assert.deepStrictEqual(names, expected, 'Urutan produk Z-A tidak sesuai')
//         })
//     })
// })
