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
