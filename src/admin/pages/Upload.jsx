import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { useOutletContext } from "react-router-dom";
import UploadService from "../helper/services/Upload";
import MarketplaceService from "../helper/services/Marketplace";

const Upload = () => {
  const { toggleLoader, toaster } = useOutletContext();

  const refFileType = useRef();
  const refFile = useRef();
  const refMarketplace = useRef();

  const [fileData, setFileData] = useState([]);
  const [marketplaces, setMarketplaces] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);
  const [databaseMapping, setDatabaseMapping] = useState([]);
  const [mappedData, setMappedData] = useState({});

  useEffect(() => {
    (async () => {
      toggleLoader(true);

      let response = await MarketplaceService.getUserMarketplaces(toaster);
      if (response) {
        if (response.error) {
          toaster.error("Failed to fetch data.");
        } else {
          setMarketplaces(response.data);
        }
      }

      toggleLoader(false);
    })();
  }, []);

  const handleMapColumns = async (e) => {
    const marketplace = refMarketplace.current.value;
    const fileType = refFileType.current.value;
    const fileUploaded = refFile.current.files;

    if (fileType === "NONE") {
      alert("Please select a file type for uploaded file");
      return;
    }

    if (fileUploaded.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    toggleLoader(true);

    let response = await MarketplaceService.getMasterMapping(toaster, fileType);
    if (response.error) {
      toaster.error("Failed to fetch data.");
    } else {
      setFileTypes(response.data);
    }

    response = await MarketplaceService.getMapping(toaster, marketplace, fileType);
    if (response.error) {
      toaster.error("Failed to fetch data.");
      toggleLoader(false);
    } else {
      setDatabaseMapping(response.data);

      await readExcel(fileType, fileUploaded[0]).then((data) => {
        let oMapData = {};
        Object.entries(data[0]).map(([key, _value]) => {
          const databaseColumn = databaseMapping[key];
          if (databaseColumn) {
            oMapData[key] = databaseColumn;
          }
        });
        setMappedData(oMapData);
      });

      toggleLoader(false);
    }
  };

  const readExcel = async (fileType, file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: "buffer",
          cellText: true,
          cellDates: true,
        });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const options = {
          raw: false,
        };
        if (fileType === "payments") {
          options["range"] = 1;
        } else if (fileType === "returns") {
          options["range"] = 7;
        }

        const data = XLSX.utils.sheet_to_json(ws, options);
        setFileData(data);

        toaster.success("File reading successful.");
        resolve(data);
      };

      fileReader.onerror = (error) => {
        toaster.error("File reading failed.");
        reject(error);
      };
    });
  };

  const handleOnChangeDataMapping = (e) => {
    const ddlValue = e.target.value;
    const excelColumnName = e.target.getAttribute("data-excel-column");
    const temp = { ...mappedData };

    if (ddlValue === "ignore") {
      delete temp[excelColumnName];
    } else {
      temp[excelColumnName] = ddlValue;
    }

    setMappedData({ ...temp });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleLoader(true);

    try {
      const marketplace = refMarketplace.current.value;
      const fileType = refFileType.current.value;
      let dataOrders = [];

      fileData.forEach((record, index) => {
        let arrRecord = {};
        Object.entries(record).map(([key, _value]) => {
          if (mappedData[key]) {
            arrRecord[key] = mappedData[key];
            arrRecord[mappedData[key]] = record[key]
          }
        });
        dataOrders.push(arrRecord);
      });
      debugger;
      // const newObject = {};
      // delete Object.assign(newObject, fileData, { [newKey]: o[oldKey] })[oldKey];

      const data = { dataOrders: fileData, marketplaceID: marketplace };
      // let response = await UploadService.uploadExcel(toaster, fileType, data);

      // if (response.success) {
      //   toaster.success("File uploaded successfully.");
      // }
    } catch (error) {}

    toggleLoader(false);
  };

  return (
    <div className="col-lg-12">
      <div className="card shadow-lg border-0 rounded-lg mt-3">
        <div className="card-header card-sign-header">
          <h3 className="text-center font-weight-bolder my-2">Upload</h3>
        </div>
        <div className="card-body">
          <form asp-action="Index">
            <div asp-validation-summary="ModelOnly" className="text-danger"></div>
            <div className="row">
              <div className="col-md-2 mb-2">
                <label htmlFor="marketplace" className="form-label">
                  Marketplace
                </label>
                <br />
                <select name="marketplace" id="marketplace" className="form-select" ref={refMarketplace}>
                  <option value="NONE">-- SELECT -- </option>
                  {marketplaces.length > 0 &&
                    marketplaces.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-md-2 mb-2">
                <label htmlFor="fileType" className="form-label">
                  File Type
                </label>
                <br />
                <select name="fileType" id="fileType" className="form-select" ref={refFileType}>
                  <option value="NONE">-- SELECT -- </option>
                  <option value="orders">1. Orders</option>
                  <option value="returns">2. Returns</option>
                  <option value="payments">3. Payments</option>
                </select>
              </div>
              <div className="col-md-3 mb-2">
                <label htmlFor="file" className="form-label">
                  File
                </label>
                <br />
                <input type="file" name="file" id="file" className="form-control" ref={refFile} />
              </div>
              <div className="col-md-2 mb-2">
                <label className="form-label">&nbsp;</label>
                <br />
                <button type="button" className="btn btn-primary" onClick={handleMapColumns}>
                  Map Columns
                </button>
              </div>
            </div>

            {fileData.length > 0 && (
              <div className="table-responsive">
                <table className="table table-bordered table-hover table-sm w-auto">
                  <thead>
                    <tr className="table-light">
                      <th>Excel Column</th>
                      <th>Excel Value</th>
                      <th>Data Mapping</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(fileData[0]).map(([key, value]) => {
                      const defaultValue = databaseMapping[key] ?? "ignore";
                      return (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{value}</td>
                          <td>
                            {/* <ExcelColumnMapping FileTypes={fileTypes} ExcelColumn={key} DatabaseMapping={databaseMapping} handleOnChange={handleOnChangeDataMapping} /> */}
                            <select className="form-select" data-excel-column={key} defaultValue={defaultValue} onChange={handleOnChangeDataMapping}>
                              <option value="ignore">-- Ignore --</option>
                              {fileTypes.map((item, index) => {
                                return (
                                  <option key={index} value={item.value}>
                                    {item.text}
                                  </option>
                                );
                              })}
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="text-center">
                        <button className="btn btn-primary my-2" onClick={handleSubmit}>
                          Submit
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
