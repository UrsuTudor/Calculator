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

const buttons = document.querySelectorAll('.operation-button');
const display = document.querySelector('#display');
let displayValue;

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        display.textContent += button.textContent;
        displayValue = display.textContent;
        getOperationElements(displayValue);
    })
})

function getOperationElements(string) {
    let displayValue = string;
    let elementsArray = Array.from(displayValue);

    let firstOperand = '';
    let secondOperand = '';
    let operator;

    let numbers = '123456789'
    elementsArray.forEach((element) => {
        if (numbers.includes(element) && !operator) {
            firstOperand += element;
        } else if (!numbers.includes(element)) {
            operator = element;
        } else if (operator) {
            secondOperand += element;
        }
    })

    let operationElements = [operator, firstOperand, secondOperand]
    return operationElements;
}

