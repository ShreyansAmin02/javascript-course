let calculation = localStorage.getItem('calculation') || '';
updateCalc(calculation) || updateCalc('0');
function calc(input) {
  calculation += input;
  console.log(calculation);
  updateCalc(calculation);
  localStorage.setItem('calculation', calculation);
}

function updateCalc(calculation) {
  document.querySelector('.js-calc').innerHTML = calculation;
}

function equalsBTN(cacluation) {
  evaluation = eval(calculation);
  updateCalc(evaluation);
  calculation = evaluation;
  localStorage.removeItem('calculation');
  if (evaluation == undefined) {
    updateCalc('0');
  }
}