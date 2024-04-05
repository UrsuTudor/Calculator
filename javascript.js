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

let operationElements;

let floatingPointBtn = document.querySelector('#floating-point');


function getOperationElements(string) {
    let operationAsString = string;
    let operationElementsArray = Array.from(operationAsString);

    let firstOperand = '';
    let secondOperand = '';
    let operator;

    let numbers = '0123456789.-';

    //if the element is a number and an operator has not been declared yet, the number/numbers will be added to the first operand; 
    //if an operator was already declared, the number/numbers will be added to the second operand, since it means the first one was already declared;
    operationElementsArray.forEach((element) => {
        if (element == '-' && firstOperand.includes('-') || element == '-' && firstOperand){
            operator = element;
        } else if (numbers.includes(element) && !operator) {
            firstOperand += element;
            if (firstOperand.includes('.')) {floatingPointBtn.disabled = true};
        } else if (!numbers.includes(element)) {
            operator = element;
            floatingPointBtn.disabled = false;
        } else if (operator && numbers.includes(element)) {
            secondOperand += element;
            if (secondOperand.includes('.')) {floatingPointBtn.disabled = true};
        }
    })

    operationElements = [operator, parseFloat(firstOperand), parseFloat(secondOperand)];
}

const equalsBtn = document.querySelector('#equals');

equalsBtn.addEventListener('click', () => {
    let result = operate(operationElements[0], operationElements[1], operationElements[2]);
    display.textContent = parseFloat(result.toFixed(5))
    if (operationElements[0] == '/' && operationElements[2] == 0){display.textContent = 'Sorry, that is not a valid operation.'}
})

const clearBtn = document.querySelector('#clear-btn');

clearBtn.addEventListener('click', () => {
    display.textContent = '';
    floatingPointBtn.disabled = false;
})

let backspaceBtn = document.querySelector('#backspace');