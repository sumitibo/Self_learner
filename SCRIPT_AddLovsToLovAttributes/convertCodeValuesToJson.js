const xlsx = require("xlsx");
const fs = require("fs");

function convertExcelFileToJsonUsingXlsx() {
  const file = xlsx.readFile("./codeValues.xlsx");

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
  const map = {};

  parsedData.forEach(val => {
    const keys = Object.keys(val);
    //console.log(keys)
    keys.forEach(key => {
        if(map.hasOwnProperty(key)){
            map[key].push(val[key]);
        }else{
            map[key] = [val[key]]
        }
    })
})
fs.writeFile("codeValues.json", JSON.stringify(map), function (err) {
  if (err) throw err;
  console.log("File converted to JSON successfully");
});
};




convertExcelFileToJsonUsingXlsx();
