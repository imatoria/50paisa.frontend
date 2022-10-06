import api from "../ApiConfig";
import { Apis } from "../API";

const getTextList = async (data) => {
  try {
    let result = await api.post(Apis.GetTextList, data);
    return result.data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

const getProductList = async (data) => {
  try {
    let result = await api.post(Apis.GetProductList, data);
    return result.data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

const createPackages = async (toaster, data) => {
  try {
    let result = await api.post(Apis.CreatePackages, data);
    if (result.data.error) {
      toaster.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const CatalogService = { getTextList, getProductList, createPackages };
export default CatalogService;
