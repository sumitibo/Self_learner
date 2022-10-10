let data = require("./data.json")
const fs = require("fs");

data= data.sort((a,b)=>{
    return a.category_id - b.category_id
})


const actualOnes =[];

for(let i=0; i<data.length-1;i++){
    if(data[i].category_id != data[i+1].category_id){
        actualOnes.push(data[i])
    }
}

fs.writeFileSync("data.json", JSON.stringify(actualOnes), function (err) {
    if (err) throw err;
  });
