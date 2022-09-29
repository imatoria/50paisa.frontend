import api from "../ApiConfig";
import { Apis } from "../API";

const getUserMarketplaces = async (toaster) => {
  try {
    let result = await api.get(Apis.GetUserMarketplaces);
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

const getMapping = async (toaster, marketplace, fileType) => {
  try {
    const data = { marketplaceID: marketplace, fileType: fileType };
    let result = await api.post(Apis.GetMapping, data);
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

const getMasterMapping = async (toaster, fileType) => {
  try {
    const data = { fileType: fileType };
    let result = await api.post(Apis.GetMasterMapping, data);
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

const MarketplaceService = { getUserMarketplaces, getMapping, getMasterMapping };
export default MarketplaceService;
