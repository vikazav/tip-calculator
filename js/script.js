let resultTip = document.querySelector('.result__number_tip');
let resultTotal = document.querySelector('.result__number_total');
let inputBoxes = document.querySelectorAll('.input');
resultTip.textContent = "$0.00";
resultTotal.textContent = "$0.00";
let bill=0, custom=0, people=0,tip=0;
let resetBtn = document.querySelector('.reset');
const elements = document.querySelectorAll(".select__tip-item");
const customBox = document.querySelector('#custom-tip');
let zeroError = document.createElement('div');
let tipPerPerson, tipTotal;

function calc () {
   if ((!bill || !people) || (!tip && !custom)) {
      return;
    }
if (tip > 0) {
   tipPerPerson =+ (bill*tip/100/people);
} else {
  tipPerPerson = + (bill*custom/100/people);
}
    
    tipTotal = + (bill/people+tipPerPerson);
       resultTip.textContent = "$"+tipPerPerson.toFixed(2);
       resultTotal.textContent ="$"+tipTotal.toFixed(2);
    
}
calc();

function getStaticDate() {
   elements.forEach(elem =>{
   elem.addEventListener('click',(e) => {
       if (e.target.getAttribute('data-tip')) {
           tip = +e.target.getAttribute('data-tip');
           custom = 0;
           customBox.value='';
                  elements.forEach(elem =>{
                     elem.classList.remove('active');
                  });
           e.target.classList.add('active');
           
           calc();
       }
   });
});
}
getStaticDate();

function getDynamicDate(selector) {
   const input = document.querySelector(selector);
   input.addEventListener('input',() => {
     if ((input.value && isNaN(input.value)) || (input.value && input.value ==0)) {
      input.style.border = '1px solid red';}
 if (input.value && input.value ==0) {
   input.parentNode.append(zeroError);
zeroError.classList.add('zero');
zeroError.innerText="Can't be zero";

     } else  { 
      //   input.style.border = 'none';
        zeroError.remove();
        input.classList.add('active-input');
        
         switch(input.getAttribute('id')) {
            case "bill":
               bill = +input.value;
               break;
            case "custom-tip":
               custom = +input.value;
               tip = 0;
               elements.forEach(elem =>{
                  elem.classList.remove('active');
               });
               break;
            case "people":
               people = +input.value;
               break;
            }
      }
   calc();
     
   });
}

   getDynamicDate('#bill');
   getDynamicDate('#custom-tip');
   getDynamicDate('#people');

console.log(bill);
console.log(custom);
console.log(people);
console.log(tip);

function reset() {
resetBtn.addEventListener('click',() =>{
inputBoxes.forEach(box =>{
box.value = '';
box.style.border = 'none';
});

resultTip.textContent = "$0.00";
resultTotal.textContent = "$0.00";
zeroError.remove();
bill=0; custom=0; people=0;tip=0;

elements.forEach(elem =>{
   elem.classList.remove('active');
});

});
}
reset();

