let arr =[
    {
        grade: "V",
        students: [
            {name: "Nrupul", marks: [10, 20, 30]},
            {name: "Prateek", marks: [20, 30, 40]}
        ]
    },
    {
        grade: "VI",
        students: [
            {name: "Aman", marks: [10, 20, 30]},
            {name: "Albert", marks: [20, 30, 40]}
        ]
    },
    {
        grade: "VII",
        students: [
            {name: "Yogesh", marks: [10, 20, 30]},
            {name: "Sandhya", marks: [20, 30, 40]}
        ]
    }
  ]


  for(let i=0; i<arr.length; i++) {
  let max = -Infinity;
  let user=null;
    for(let j=0;j<arr[i].students.length;j++) {
        let studentAccess = arr[i].students[j]
        let temp =0;
        for(let k=0;k<studentAccess.marks.length;k++){
            temp= temp + arr[i].students[j].marks[k]
        }
        if(max < temp){
            max = temp;
            user= studentAccess.name
        }
    }
    console.log(arr[i].grade,"-",user,"-",max)
  }