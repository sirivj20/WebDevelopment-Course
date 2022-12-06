const fs = require('fs');
/*
fs.readFile('./puzzle.txt', (err, data) => {
  const directions = data.toString();
  const directionArray = directions.split('');
  const answer = directionArray.reduce((acc,currentValue)=>{
    if(currentValue === "(" )
    {
        return acc += 1;
    }
    else {
        return acc -= 1;
    }
    
  },0 )
  console.log('floor: ',answer);

  }); */

//character position 
var count =0;
const function2= () =>{
    fs.readFile('./puzzle.txt', (err, data) => {
        const directions = data.toString();
        const directionArray = directions.split('');
        let acc = 0;
        const answer = directionArray.some((currentItem)=>{
          if(currentItem === "(" )
          {
              acc += 1;
          }
          else {
              acc -= 1;
          } 
          count ++;
          return acc <0;
        } )
        console.log('basement: ',count);
      
    

    });
    
}

function2();



