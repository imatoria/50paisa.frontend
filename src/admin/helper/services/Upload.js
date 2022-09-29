import api from "../ApiConfig";
import { Apis } from "../API";

const uploadExcel = async (toaster, fileType, data) => {
  try {
    let result = await api.post(Apis.UploadExcel + `/${fileType}`, data);
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

const UploadService = { uploadExcel };
export default UploadService;
