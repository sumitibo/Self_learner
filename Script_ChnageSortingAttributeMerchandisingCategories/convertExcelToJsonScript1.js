const xlsx = require("xlsx");
const fs = require("fs");
const axios = require("axios");
const allData = [];
const errorData = [];

function convertExcelFileToJsonUsingXlsx() {
  const file = xlsx.readFile("Data.xlsx");

  const sheetNames = file.SheetNames;

  const totalSheets = sheetNames.length;

  const parsedData = [];
  for (let i = 0; i < totalSheets; i++) {
    const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
    parsedData.push(...tempData);
  }

  manipulateDataAsPerExcelSheet(parsedData);

  // fs.writeFile("data.json", JSON.stringify(parsedData), function (err) {
  //   if (err) throw err;
  //   console.log("File converted to JSON successfully");
  // });
}

const manipulateDataAsPerExcelSheet = (parsedData) => {
  const manipulatedData = [];

  parsedData.forEach((variant) => {
    const variant_attributes = [];

    if (variant["Variant 1"]) {
      variant_attributes.push({
        code: variant["Variant 1"],
        position: 0,
      });
    }
    if (variant["Variant 2"]) {
      variant_attributes.push({
        code: variant["Variant 2"],
        position: 1,
      });
    }
    if (variant["Variant 3"]) {
      variant_attributes.push({
        code: variant["Variant 3"],
        position: 2,
      });
    }

    if (variant_attributes.length > 0) {
      const payload = {
        category_id: variant.category_id,
        default_variant_attributes: variant_attributes,
      };
      manipulatedData.push(payload);
    }
  });


  checkForDifferencesOfAttributes(manipulatedData);
};

function checkForDifferencesOfAttributes(manipulatedData) {
  manipulatedData.forEach((item) => {
    axios
      .get(
        `https://services.ibo.com/catalog/v1/categories/merchandising/${item.category_id}?catalog_version=ONLINE`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFBcU9GbzVILUhSek9VRl9ENVhZVyJ9.eyJpc3MiOiJodHRwczovL2Vib21hcnQudXMuYXV0aDAuY29tLyIsInN1YiI6IlRnM21kc1FITGtUSE1CZUlWb01ReGI4QnUxTjVLWmtFQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3NlcnZpY2VzLmliby5jb20iLCJpYXQiOjE2NjM4NDgwMTIsImV4cCI6MTY2NjQ0MDAxMiwiYXpwIjoiVGczbWRzUUhMa1RITUJlSVZvTVF4YjhCdTFONUtaa0UiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.saDYua0GBGI4puqIjz2mjThScKB5NlRtJ8aOPF3qiagCj9ckBigsJW6r_jt0qgIcbos5qhpV6VaidgJLCAYRZ6Ilr5x4_mPxbE_mMihwAKtAEg-k9j-PqwUSwTQmc9rmE0w5jJAo-ryIP-bnXAg3u3qRU3VmT2E_jjlusD3Fa9gSbU34Vjgt8zZRtt4I_ialobbzTI1Wcx3obL2mVeH-16VqLxeWvsKwukxuW0xZybcN_CxRZGMNhY1jJWjH8dn23xAbfG0vq-2iZ4XbuYn3fWiDeAARHphCfE2hrvMpCI15e1FkOLTVZ0uxx9N_Esz8qpw5PRv08bWuP80DzfiLdA",
          },
        }
      )
      .then(function (response) {
        const getter = [];
        const getter2=[];
        response.data.default_variant_attributes.map((item) => {
          getter.push(item.code, item.type);
          getter2.push(item.code, item.group);

        });

        item.default_variant_attributes.map((ele) => {
          const found = getter.indexOf(ele.code);
          if (found !== -1) {
            ele.type = getter[found + 1];
            ele.group = getter2[found + 1];
            allData.push(item);
          } else {
            console.log(
              "EXISTING DATA - FOR CAT_ID",
              response.data.category_id,
              response.data.default_variant_attributes,
              "DATA GOING TO WRITE IN PROD",
              item.default_variant_attributes
            );
            errorData.push({
              category_id: response.data.category_id,
              existing: response.data.default_variant_attributes,
              writing: item.default_variant_attributes,
            });
          }
        });
        
      })
      .then(async function () {
        fs.writeFile("data.json", JSON.stringify(allData), function (err) {
          if (err) throw err;
        });
        fs.writeFile(
          "errorData.json",
          JSON.stringify(errorData),
          function (err) {
            if (err) throw err;
          }
        );
      })
      .catch((err) => console.log(err, "ERROR"));
  });
}

convertExcelFileToJsonUsingXlsx();
