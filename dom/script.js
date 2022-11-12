
var ul = document.querySelector("ul");
var input = document.getElementById("userinput") ;
var toggle = 0;
function enterElements()  {
    if(input.value.length > 0){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(input.value));
        ul.appendChild(li);
    }
}
function toggleCheck() {
    if(toggle == 0){
        toggle = 1;
        
    }

}