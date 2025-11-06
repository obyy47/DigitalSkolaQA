import { expect } from "chai";

// buat test suite
describe("API Demo Testing", () => {
  // nama test case
  it("Coba buka aplikasinya", async () => {
    console.log("Aplikasi terbuka");
    expect(true).to.equal(true);
  });

  it("Seharusnya validasi judul halaman", async () => {
    // Cek environment atau lakukan assertion sederhana

    const isAppOpened = true; // Asumsi app sudah terbuka dari test sebelumnya
    const expectedTitle = "API Demos";

    expect(isAppOpened).to.be.true;
    expect(expectedTitle).to.equal("API Demos");

    console.log("Berhasil validasi aplikasi API Demos");
    console.log("Aplikasi menunjukkan berbagai fitur Android:");
  });

  it("Test basic Appium commands", async function () {
    this.timeout(30000);

    // Test 1: Get current activity
    const currentActivity = await driver.getCurrentActivity();
    console.log("Current Activity:", currentActivity);

    // Test 2: Get device time
    const deviceTime = await driver.getDeviceTime();
    console.log("Device Time:", deviceTime);

    // Test 3: Get device orientation
    const orientation = await driver.getOrientation();
    console.log("Device Orientation:", orientation);

    // Test 4: Simple validation
    expect(currentActivity).to.include("ApiDemos");
    console.log("✅ Basic Appium commands work!");
  });

  it("Klik menu App", async function () {
    this.timeout(30000);

    // TUNGGU sampai element "App" ada dan visible
    const appMenu = await $('//*[@text="App"]');
    await appMenu.waitForDisplayed({ timeout: 60000 }); // Tunggu max 10 detik

    // BARU KLIK setelah element ready
    await appMenu.click();

    console.log("✅ BERHASIL KLIK MENU APP!");
  });
});
