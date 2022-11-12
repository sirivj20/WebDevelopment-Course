function cleanArray(array) {
    for(var i = 0; i<array.length ; i++){
        for(var j = 0 ; j < array.length ;j++){
        if(array[i] === array[j]){
            let array1 =[];
            array1.push(array[j]);
            console.log(array1);

        }
        else{
            console.log("not same");
        }
    }
}
} 
