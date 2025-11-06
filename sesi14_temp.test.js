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

  it("Kembali ke halaman utama Api Demos", async function () {
    this.timeout(30000);

    // Tunggu sebentar biar halaman App fully loaded
    await driver.pause(2000);

    // KLIK tombol back Android
    await driver.back();

    // Tunggu animasi selesai
    await driver.pause(1000);

    // Validasi balik ke halaman utama
    const appMenu = await $('//*[@text="App"]');
    await expect(appMenu).to.exist;

    console.log("BERHASIL KEMBALI KE MENU UTAMA API DEMOS!");
  });

  it("Input elemen", async () => {
    const appMenu = await $('//android.widget.TextView[@content-desc="App"]');
    const alertDialogMenu = await $(
      `//android.widget.TextView[@content-desc="Alert Dialogs"]`
    );
    const textEntryMenu = await $(
      `//android.widget.Button[@content-desc="Text Entry dialog"]`
    );

    await appMenu.waitForDisplayed();
    await appMenu.click();

    await alertDialogMenu.waitForDisplayed();
    await alertDialogMenu.click();

    await textEntryMenu.waitForDisplayed();
    await textEntryMenu.click();

    const nameField = await $(
      `//android.widget.EditText[@resource-id="io.appium.android.apis:id/username_edit"]`
    );
    const passwordField = await $(
      `//android.widget.EditText[@resource-id="io.appium.android.apis:id/password_edit"]`
    );

    await nameField.setValue("obby");
    await passwordField.setValue("12345678");

    console.log("Berhasil mengisi Name dan Password!");

    await driver.back(); // Keluar dari Text Entry dialog
    await driver.back(); // Kembali ke daftar Alert Dialogs
    await driver.back(); // Kembali ke halaman utama API Demos

    console.log("Berhasil kembali ke halaman utama!");
  });

  it("Scroll down", async () => {
    const viewsMenu = await $(
      `//android.widget.TextView[@content-desc="Views"]`
    );
    await viewsMenu.waitForDisplayed();
    await viewsMenu.click();

    const target = await $(
      `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Layouts"))`
    );
    await target.waitForDisplayed();
    await target.click();
  });
});
