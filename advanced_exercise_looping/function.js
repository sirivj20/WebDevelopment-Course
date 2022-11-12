function checkDriverAge () {
    var age = prompt("What is your age?");
    if (age < 18)  {
      alert("Sorry, you are too yound to drive this car. Powering off");
    }
    else if (age > 18) {
      alert("Powering On. Enjoy the ride!");
    } 
    else (age === 18){ 
      alert("Congratulations on your first year of driving. Enjoy the ride!");
    }
  }