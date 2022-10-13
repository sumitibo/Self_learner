const data = require("./data.json");


data.forEach((item)=>{
    console.log(`update merchandising_category set default_variant_attributes='${JSON.stringify(item.default_variant_attributes)}' where category_id='${item.category_id}';`)
})