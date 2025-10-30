import { By } from "selenium-webdriver";

const pageSort = {
  dropdownSort: By.className("product_sort_container"),
  optionZA: By.css("option[value='za']"),
  productNames: By.className("inventory_item_name"),
};

export default pageSort;
