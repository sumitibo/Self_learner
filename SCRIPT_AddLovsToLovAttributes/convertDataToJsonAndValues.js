const xlsx = require("xlsx");
const fs = require("fs");

const keyValues = require("./codeValues.json");


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
}

const manipulateDataAsPerExcelSheet = (parsedData) => {
  const deta = [];

  parsedData.forEach((element) => {
    deta.push({...element,values:keyValues[element.attribute_code]});
  });

  fs.writeFile("data.json", JSON.stringify(deta), function (err) {
    if (err) throw err;
    console.log("File converted to JSON successfully");
  });
};

convertExcelFileToJsonUsingXlsx();
