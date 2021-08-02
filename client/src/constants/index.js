import * as config from "../config.json";
export const apiBaseURL = config.apiUrl;

export const localStorageKeys = {
  ACCESS_TOKEN: "accessToken",
  TOKEN_EXPIRATION_DATE: "tokenExpirationDate",
  USER_INFO: "userInfo",
  USER_COGNITO_ID: "userCognitoId",
  ACCOUNT_TYPE: "accountType",
};

export const businessFormOptions = [
  { name: "Weddings", id: 1 },
  { name: "Birthdays", id: 2 },
  { name: "Dessert Platters", id: 3 },
  { name: "Cupcakes", id: 4 },
  { name: "Cookies", id: 5 },
  { name: "Corporate Events", id: 6 },
];

export const occasionOrder = {
  "Wedding Party": 1,
  "Birthday Party": 2,
  "Family Gathering": 3,
  "Corporate Event": 4,
};

export const deliveryMethodOrder = {
  Delivery: 1,
  "Delivery preferred, but can pickup": 2,
  "Pick up": 3,
};

export const accountTypesEnum = {
  BUSINESS: "business",
  CUSTOMER: "customer",
};

export const accountTypes = {
  business: "business",
  customer: "customer",
};
