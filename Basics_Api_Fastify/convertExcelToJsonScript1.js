const xlsx = require("xlsx");
const fs = require("fs");
const axios = require("axios");

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
        type: "CORE_ATTRIBUTES",
      });
    }
    if (variant["Variant 2"]) {
      variant_attributes.push({
        group: "specs",
        code: variant["Variant 2"],
        position: 1,
        type: "CORE_ATTRIBUTES",
      });
    }
    if (variant["Variant 3"]) {
      variant_attributes.push({
        group: "specs",
        code: variant["Variant 3"],
        position: 2,
        type: "CORE_ATTRIBUTES",
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

  fs.writeFile("data.json", JSON.stringify(manipulatedData), function (err) {
    if (err) throw err;
    console.log("EXCEL FILE CONVERTED AND MODIFIED SUCCESSFULLY");
  });

  checkForDifferencesOfAttributes(manipulatedData);
};

function checkForDifferencesOfAttributes(manipulatedData) {
  manipulatedData.forEach((item) => {
    axios
      .get(
        `http://localhost:4444/v1/categories/merchandising/${item.category_id}?catalog_version=ONLINE&include_attribute_lovs=true`)
      .then(function (response) {
        if (
          response.data.default_variant_attributes.length !=
          item.default_variant_attributes.length
        ) {
          console.log(
            "EXISTING DATA - FOR CAT_ID",response.data.category_id,
            response.data.default_variant_attributes,
            "DATA GOING TO WRITE IN PROD",
            item.default_variant_attributes
          );
        }
      })
      .catch((err) => console.log(err));
  });
}

convertExcelFileToJsonUsingXlsx();
