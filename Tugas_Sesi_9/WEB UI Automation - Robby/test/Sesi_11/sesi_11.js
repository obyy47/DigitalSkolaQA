import { Builder, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import firefox from "selenium-webdriver/firefox.js";
import assert from "assert";
import pageLogin from "../../POM_Sesi-11/page_login.js";
import pageSort from "../../POM_Sesi-11/page_sorting.js";
import { performVisualTest, performLogin } from "./test_helpers.js";

describe("Sesi 11 - Web Automation Pt.2", () => {
  let driver;

  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  describe("Chrome Tests", () => {
    beforeEach(async () => {
      const options = new chrome.Options();
      options.addArguments("--headless");

      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
    });

    it("Login ke web SauceDemo dan cek Page Title", async () => {
      await performLogin(driver, "ss_chrome");
      await performVisualTest(driver);
    });

    it("Sorting produk di SauceDemo (Z -> A)", async () => {
      await driver.get("https://www.saucedemo.com/");
      await driver
        .findElement(pageLogin.inputUsername)
        .sendKeys("standard_user");
      await driver
        .findElement(pageLogin.inputPassword)
        .sendKeys("secret_sauce");
      await driver.findElement(pageLogin.buttonLogin).click();
      await driver.wait(until.urlContains("inventory"), 5000);

      // Sorting Z -> A
      await driver.findElement(pageSort.dropdownSort).click();
      await driver.findElement(pageSort.optionZA).click();
      await driver.sleep(1000);

      // Verify sorting
      const productElements = await driver.findElements(pageSort.productNames);
      const productNames = await Promise.all(
        productElements.map(async (el) => await el.getText())
      );

      const expectedNames = [...productNames].sort((a, b) =>
        b.localeCompare(a)
      );
      assert.deepStrictEqual(productNames, expectedNames);

      console.log("CHROME Sorting Z → A berhasil dan urutannya benar!");
    });
  });

  describe("Firefox Tests", () => {
    beforeEach(async () => {
      const options = new firefox.Options();
      options.addArguments("--headless");

      driver = await new Builder()
        .forBrowser("firefox")
        .setFirefoxOptions(options)
        .build();
    });

    it("Login ke web SauceDemo dan cek Page Title", async () => {
      await performLogin(driver, "ss_firefox");
      await performVisualTest(driver);
    });

    it("Sorting produk di SauceDemo (Z -> A)", async () => {
      await driver.get("https://www.saucedemo.com/");
      await driver
        .findElement(pageLogin.inputUsername)
        .sendKeys("standard_user");
      await driver
        .findElement(pageLogin.inputPassword)
        .sendKeys("secret_sauce");
      await driver.findElement(pageLogin.buttonLogin).click();
      await driver.wait(until.urlContains("inventory"), 5000);

      // Sorting Z -> A
      await driver.findElement(pageSort.dropdownSort).click();
      await driver.findElement(pageSort.optionZA).click();
      await driver.sleep(1000);

      // Verify sorting
      const productElements = await driver.findElements(pageSort.productNames);
      const productNames = await Promise.all(
        productElements.map(async (el) => await el.getText())
      );

      const expectedNames = [...productNames].sort((a, b) =>
        b.localeCompare(a)
      );
      assert.deepStrictEqual(productNames, expectedNames);

      console.log("FIREFOX Sorting Z → A berhasil dan urutannya benar!");
    });
  });
});
