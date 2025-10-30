import { By } from "selenium-webdriver";

class pageLogin {
  static inputUsername = By.id("user-name");
  static inputPassword = By.id("password");
  static buttonLogin = By.id("login-button");
}

export default pageLogin;
