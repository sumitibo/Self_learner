const xlsx = require("xlsx");
const fs = require("fs");
const axios = require("axios");
const allData = [];

function convertExcelFileToJsonUsingXlsx() {
  const file = xlsx.readFile("./Data.xlsx");

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
        group: "specs",
        code: variant["Variant 1"],
        position: 0,
      });
    }
    if (variant["Variant 2"]) {
      variant_attributes.push({
        group: "specs",
        code: variant["Variant 2"],
        position: 1,
      });
    }
    if (variant["Variant 3"]) {
      variant_attributes.push({
        group: "specs",
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
        `http://localhost:4444/v1/categories/merchandising/${item.category_id}?catalog_version=ONLINE&include_attribute_lovs=true`
      )
      .then(function (response) {
        const getter = [];
        response.data.default_variant_attributes.map((item) => {
          getter.push(item.code, item.type);
        });

        item.default_variant_attributes.map((ele) => {
          const found = getter.indexOf(ele.code);
          if (found !== -1) {
            ele.type = getter[found + 1];
          } else {
            console.log(
              "EXISTING DATA - FOR CAT_ID",
              response.data.category_id,
              response.data.default_variant_attributes,
              "DATA GOING TO WRITE IN PROD",
              item.default_variant_attributes
            );
          }
        });
        // fs.appendFileSync("data.json", JSON.stringify(item));
        allData.push(item);
      })
      .then(async function () {
        fs.writeFile("data.json", JSON.stringify(allData), function (err) {
          if (err) throw err;
        });
      })
      .catch((err) => console.log(err));
  });
}

convertExcelFileToJsonUsingXlsx();
