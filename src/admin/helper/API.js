const API_URL =
  document.domain === "localhost"
    ? "http://" + document.domain + ":5000/api"
    : document.domain.startsWith("192.168.")
    ? "http://" + document.domain + ":5000/api"
    : "https://paisa50.herokuapp.com/api";
// const API_URL = document.domain === "localhost" ? "http://localhost:5000/api" : "https://paisa50.herokuapp.com/api";

const Apis = {
  //Authentication api
  GetUserLogin: `${API_URL}/auth/rootLogin`,
  GetUserRegsiter: `${API_URL}/auth/register`,

  //Marketplace api
  GetUserMarketplaces: `${API_URL}/marketplace/getUserMarketplaces`,
  GetMapping: `${API_URL}/marketplace/getMapping`,
  GetMasterMapping: `${API_URL}/marketplace/getMasterMapping`,

  //Catalog api
  GetTextList: `${API_URL}/catalog/getTextList`,
  GetProductList: `${API_URL}/catalog/getProductList`,
  CreatePackages: `${API_URL}/catalog/createPackages`,

  //Upload Excel api
  UploadExcel: `${API_URL}/upload/excel`,
};
export { API_URL, Apis };
