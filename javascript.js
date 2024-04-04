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

let firstOperand;
let secondOperand;
let operator;

function operate(operator, firstOperand, secondOperand) {
    switch (operator) {
        case '+':
            return add(firstOperand, secondOperand);
        
        case '-':
            return subtract(firstOperand, secondOperand);
        
        case '*':
            return multiply(firstOperand, secondOperand);
        
        case '/':
            return divide(firstOperand, secondOperand);

        default:
            break;
    }
}

console.log(operate('/', 5, 7))

const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display')

buttons.forEach((button) => {
    button.addEventListener('click', () => {display.textContent += ' ' + button.textContent})
})