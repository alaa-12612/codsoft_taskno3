const buttons = document.querySelectorAll("button");
const display = document.getElementById("writing_area");

let currentInput = "";
let firstOperand = null;
let operator = null;
let isResultDisplayed = false;

function updateDisplay(value)
 {
  display.innerText = value ;
}

function calculate(a, b, op)
 {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b !== 0 ? a / b : "Error";
    default: return b;
  }
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    
    if (isResultDisplayed && !["+", "-", "*", "/", "=", "C", "DEL"].includes(value)) 
      {
      currentInput = "";
      firstOperand = null;
      operator = null;
      isResultDisplayed = false;
    }

    if (value === "C") 
      {
      currentInput = "";
      firstOperand = null;
      operator = null;
      isResultDisplayed = false;
    } else if (value === "DEL") {
      currentInput = currentInput.slice(0, -1);
    } else if (["+", "-", "*", "/"].includes(value)) {

      if (currentInput === "" || ["+", "-", "*", "/"].includes(currentInput.slice(-1))) return;

    
      if (isResultDisplayed)
         {
        isResultDisplayed = false;
      }

      firstOperand = currentInput;
      operator = value;
      currentInput += value;
    } 
    else if (value === "=") 
      {
      if (!firstOperand || !operator) return;

      const secondOperand = currentInput.split(operator)[1];
      if (secondOperand === "") return;

      const result = calculate(firstOperand, secondOperand, operator);
      updateDisplay(result);
      currentInput = result.toString();
      firstOperand = result.toString();
      operator = null;
      isResultDisplayed = true;
      return; 
    } 
    else {
      currentInput += value;
    }

    updateDisplay(currentInput);
  });
});