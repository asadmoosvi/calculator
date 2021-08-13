function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function modulus(a, b) {
  return a % b;
}

function operate(operator, a, b) {
  let validOperations = '+, -, *, /, %';
  let result;
  switch (operator) {
    case '+':
      result = add(a, b);
      break;
    case '-':
      result = subtract(a, b);
      break;
    case '*':
      result = multiply(a, b);
      break;
    case '/':
      result = divide(a, b);
      break;
    case '%':
      result = modulus(a, b);
      break;
    default:
      result = null;
      console.error(
        `[Error] Invalid operator '${operator}': expected one of ${validOperations}`
      );
  }
  return result;
}

/* main code */
const display = document.querySelector('.calculator__text');
const buttons = document.querySelectorAll('.calculator__button');
let currentDisplay = '';
let operandA = '';
let operation = '';
let operandB = '';

function updateDisplay() {
  display.textContent = operandA + operation + operandB;
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.type === 'number') {
      if (!operation) {
        operandA += button.dataset.value;
      } else {
        operandB += button.dataset.value;
      }
    } else if (button.dataset.type === 'operation') {
      //if an operation is not already supplied
      if (!operation) {
        operation = button.dataset.value;
      } else {
        if (operandB) {
          operandA = String(
            operate(operation === 'x' ? '*' : operation, +operandA, +operandB)
          );
          operation = button.dataset.value;
          operandB = '';
        }
      }
    } else if (button.dataset.type === 'control') {
      if (button.dataset.value === 'equals') {
        if (operandB) {
          operandA = String(
            operate(operation === 'x' ? '*' : operation, +operandA, +operandB)
          );
          operation = '';
          operandB = '';
        }
      } else if (button.dataset.value === 'clear') {
        operandA = '';
        operation = '';
        operandB = '';
      } else if (button.dataset.value === 'decimal') {
        if (!operandB) {
          if (operation) operandB = '0.';
          //if decimal point is not already added then add it
          else if (operandA.indexOf('.') === -1) {
            operandA += '.';
          }
        } else {
          if (operandB.indexOf('.') === -1) {
            operandB += '.';
          }
        }
      } else if (button.dataset.value === 'sign') {
        if (!operandB) {
          if (operandA) operandA = String(+operandA * -1);
        } else {
          operandB = String(+operandB * -1);
        }
      } else if (button.dataset.value === 'backspace') {
        if (operandB) {
          operandB = operandB.slice(0, -1);
        } else if (operation) {
          operation = '';
        } else if (operandA) {
          operandA = operandA.slice(0, -1);
        }
      }
    }
    updateDisplay();
  });
});

function clickButton(keyboardValue) {
  keyboardValue = keyboardValue.toLowerCase();
  if (keyboardValue === 'enter') keyboardValue = '=';

  let keyboardToButton = {
    delete: 'clear',
    '~': 'sign',
    '=': 'equals',
    '.': 'decimal',
    '*': 'x',
  };
  if (keyboardValue in keyboardToButton) {
    keyboardValue = keyboardToButton[keyboardValue];
  }

  let button = document.querySelector(
    `.calculator__button[data-value="${keyboardValue}"]`
  );
  if (button) button.click();
}

document.body.addEventListener('keydown', (e) => {
  clickButton(e.key);
});
