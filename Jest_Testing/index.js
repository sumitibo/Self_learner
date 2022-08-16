const add = (a, b) => {
  if (!a && !b) return null;
  if ((a && !b) || (b && !a)) return "Please provide all parameters";
  return a + b;
};

const err = () =>{
    throw new Error("I am new Error");
}

const promiseTest = (a,b,delay) =>{
    return new Promise((resolve,reject)=>{
        if(!a || !b) reject("Something is missing");
        if(a+b > 0){
            setTimeout(()=>{
                console.log("AXXX")
                resolve("Happy");
            },delay * 1000);
        }else{
            reject('Sad');
        }
    })
}



module.exports = {
  add,
  err,
  promiseTest
};
