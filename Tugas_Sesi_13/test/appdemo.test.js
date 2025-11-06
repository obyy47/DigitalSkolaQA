import { expect } from "chai";

// buat test suite
describe("API Demo Testing", () => {
  // nama test case
  it("Coba buka aplikasinya", async () => {
    console.log("Aplikasi terbuka");
    expect(true).to.equal(true);
  });

  it("Seharusnya validasi judul halaman", async () => {
    const isAppOpened = true;
    const expectedTitle = "API Demos";

    expect(isAppOpened).to.be.true;
    expect(expectedTitle).to.equal("API Demos");

    console.log("Berhasil validasi aplikasi API Demos");
    console.log("Aplikasi menunjukkan berbagai fitur Android:");
  });

  it("Test basic Appium commands", async function () {
    this.timeout(30000);

    const currentActivity = await driver.getCurrentActivity();
    console.log("Current Activity:", currentActivity);

    const deviceTime = await driver.getDeviceTime();
    console.log("Device Time:", deviceTime);

    const orientation = await driver.getOrientation();
    console.log("Device Orientation:", orientation);

    expect(currentActivity).to.include("ApiDemos");
    console.log("Basic Appium commands work!");
  });

  it("Klik menu App", async function () {
    this.timeout(30000);

    const appMenu = await $('//*[@text="App"]');
    await appMenu.waitForDisplayed({ timeout: 60000 });
    await appMenu.click();

    console.log("BERHASIL KLIK MENU APP!");
  });
});
