import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CatalogService from "../helper/services/Catalog";

const Catalog = () => {
  const { toggleLoader, toaster } = useOutletContext();

  const [topTextList, setTopTextList] = useState([]);
  const [bottomTextList, setBottomTextList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productType, setProductType] = useState("0");
  const [totalInCombo, setTotalInCombo] = useState(0);
  const [packages, setPackages] = useState([]);

  const refProductType = useRef();
  const refTotalInCombo = useRef();
  const refTopText = useRef();
  const refBottomText = useRef();
  const refSN = useRef();
  const refProduct1 = useRef();
  const refProduct2 = useRef();
  const refProduct3 = useRef();
  const refProduct4 = useRef();

  useEffect(() => {
    const getData = async () => {
      let data = { productType: productType, totalInCombo: totalInCombo };
      if (data.productType !== "0" && data.totalInCombo !== 0) {
        toggleLoader(true);
        Promise.all([CatalogService.getTextList(), CatalogService.getProductList(data)]).then(([arrText, products]) => {
          if (arrText.error || products.error) {
            toaster.error("Encountered issue in fetching data.");
          } else {
            setTopTextList(arrText.data.topText);
            setBottomTextList(arrText.data.bottomText);
            setProductList(products.data);
          }

          toggleLoader(false);
        });
      }
    };

    getData();
  }, [productType, totalInCombo]);

  const SetPackage = async (event) => {
    event.preventDefault();
    setProductType(refProductType.current.value);
    setTotalInCombo(parseInt(refTotalInCombo.current.value));
  };
  const AddPackage = (event) => {
    event.preventDefault();

    let sku =
      productType.toUpperCase().charAt(0) +
      refSN.current.value +
      "_" +
      totalInCombo +
      "_" +
      refProduct1.current.value +
      "_" +
      refProduct2.current.value +
      (totalInCombo > 2 ? "_" + refProduct3.current.value + (totalInCombo > 3 ? "_" + refProduct4.current.value : "") : "");
    setPackages([...packages, sku]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    toggleLoader(true);

    let data = {
      productType: productType,
      totalInCombo: totalInCombo,
      packages: packages,
      topTextIndex: parseInt(refTopText.current.value),
      bottomTextIndex: parseInt(refBottomText.current.value),
    };

    let result = await CatalogService.createPackages(toaster, data);

    if (result.error) {
      toaster.error("Encountered issue in fetching data.");
    } else {
      toaster.success(`${result.skus.length} packages created successfully.`);
      setPackages([]);
    }
    toggleLoader(false);
  };

  return (
    <div className="col-lg-12">
      <div className="card shadow-lg border-0 rounded-lg mt-3">
        <div className="card-header card-sign-header">
          <h3 className="text-center font-weight-bolder my-2">Catalog</h3>
        </div>
        <div className="card-body">
          <form asp-action="Index">
            <div className="row">
              <div asp-validation-summary="ModelOnly" className="text-danger"></div>
              <div className="col-md-2 mb-2">
                <label htmlFor="productType" className="form-label">
                  Product Type
                </label>
                <select name="productType" id="productType" ref={refProductType} className="form-select" onChange={SetPackage}>
                  <option value="0">-- Select --</option>
                  <option value="double">Double</option>
                  <option value="single">Single</option>
                  <option value="ethnic">Ethnic</option>
                </select>
              </div>
              <div className="col-md-2 mb-2">
                <label htmlFor="totalInCombo" className="form-label">
                  No. of Products
                </label>
                <select name="totalInCombo" id="totalInCombo" ref={refTotalInCombo} className="form-select" onChange={SetPackage}>
                  <option value="0">-- Select --</option>
                  <option value="2">2 (Two)</option>
                  <option value="3">3 (Three)</option>
                  <option value="4">4 (Four)</option>
                </select>
              </div>
            </div>
            {productList.length > 0 && (
              <>
                <div className="row mb-5">
                  <div className="col-md-4 mb-2">
                    <label htmlFor="topText" className="form-label">
                      Top Text
                    </label>
                    <select name="topText" id="topText" ref={refTopText} className="form-select">
                      <option value="-1">-- Select --</option>
                      {topTextList.map((data, index) => {
                        return (
                          <option key={index} value={index}>
                            {data.text}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-4 mb-2">
                    <label htmlFor="bottomText" className="form-label">
                      Bottom Text
                    </label>
                    <select name="bottomText" id="bottomText" ref={refBottomText} className="form-select">
                      <option value="-1">-- Select --</option>
                      {bottomTextList.map((data, index) => {
                        return (
                          <option key={index} value={index}>
                            {data.text}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="table-responsive border">
                  <table className="table table-sm mb-0">
                    <thead>
                      <tr className="catalog-change">
                        <td>S.N.</td>
                        <td>Product 1</td>
                        <td>Product 2</td>
                        <td>Product 3</td>
                        <td>Product 4</td>
                        <td>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="col-md-2">
                          <input className="form-control" ref={refSN} type="text" />
                        </td>
                        <td className="col-md-2">
                          <select className="form-select" ref={refProduct1}>
                            {productList.map((e, key) => {
                              return (
                                <option key={key} value={e}>
                                  {e}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                        <td className="col-md-2">
                          <select className="form-select" ref={refProduct2}>
                            {productList.map((e, key) => {
                              return (
                                <option key={key} value={e}>
                                  {e}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                        <td className="col-md-2">
                          <select className="form-select" disabled={totalInCombo < 3} ref={refProduct3}>
                            {productList.map((e, key) => {
                              return (
                                <option key={key} value={e}>
                                  {e}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                        <td className="col-md-2">
                          <select className="form-select" disabled={totalInCombo < 4} ref={refProduct4}>
                            {productList.map((e, key) => {
                              return (
                                <option key={key} value={e}>
                                  {e}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                        <td className="col-md-2">
                          <button className="btn btn-success" title="Add Package" onClick={AddPackage}>
                            Add
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={5}>
                          {packages.length > 0 && (
                            <ol>
                              {packages.map((item, key) => {
                                return <li key={key}>{item}</li>;
                              })}
                            </ol>
                          )}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                    {packages.length > 0 && (
                      <tfoot>
                        <tr className="catalog-change">
                          <td colSpan="5">
                            <button className="btn btn-primary" title="Submit" onClick={(event) => handleSubmit(event)}>
                              Submit
                            </button>
                          </td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
