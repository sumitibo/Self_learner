const data = require("./errorData.json");




const res = data.filter((item)=>{
    return item.existing.length > 0;
}).map((item)=>{
    return item.category_id
})
console.log(res)