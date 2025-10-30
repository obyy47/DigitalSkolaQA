import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import assert from "assert";
import pageLogin from "../../POM_Sesi-11/page_login.js";

// Helper function buat visual testing
export async function performVisualTest(driver) {
  const capabilities = await driver.getCapabilities();
  const browserName = capabilities.getBrowserName();
  const visualDir = `visual/${browserName}`;

  const baselinePath = `${visualDir}/baseline.png`;
  const currentPath = `${visualDir}/current.png`;
  const diffPath = `${visualDir}/diff.png`;

  // Screenshot current state
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(currentPath, Buffer.from(screenshot, "base64"));

  // Create baseline kalo belom ada
  if (!fs.existsSync(baselinePath)) {
    fs.copyFileSync(currentPath, baselinePath);
    console.log(`Baseline image created for ${browserName}`);
  }

  // Compare baseline vs current
  const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
  const img2 = PNG.sync.read(fs.readFileSync(currentPath));
  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  if (numDiffPixels > 0) {
    console.log(`[${browserName}] Visual differences found: ${numDiffPixels}`);
  } else {
    console.log(`[${browserName}] No visual differences found.`);
  }
}

// Helper function buat login
export async function performLogin(driver, screenshotDir) {
  await driver.get("https://www.saucedemo.com/");

  const title = await driver.getTitle();
  assert.strictEqual(title, "Swag Labs");

  const inputUsernamePOM = await driver.findElement(pageLogin.inputUsername);
  const inputPasswordPOM = await driver.findElement(pageLogin.inputPassword);
  const buttonLoginPOM = await driver.findElement(pageLogin.buttonLogin);

  await inputUsernamePOM.sendKeys("standard_user");
  await inputPasswordPOM.sendKeys("secret_sauce");

  // Partial Screenshot
  const ssPartial_username = await inputUsernamePOM.takeScreenshot();
  fs.writeFileSync(
    `${screenshotDir}/pageLogin/partialLogin.png`,
    Buffer.from(ssPartial_username, "base64")
  );

  await buttonLoginPOM.click();
  await driver.sleep(2000);

  // Full Screenshot
  const ssFull = await driver.takeScreenshot();
  fs.writeFileSync(
    `${screenshotDir}/pageLogin/login.png`,
    Buffer.from(ssFull, "base64")
  );
}
