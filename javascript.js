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
let decimalCount = 0;

function regulateDecimals(keyPressed) {
    if (keyPressed.keyCode == 190) {decimalCount++};
    console.log(decimalCount)
    if (decimalCount > 1 && keyPressed.keyCode == 190) {
        displayValue = Array.from(display.value);
        displayValue.pop();
        display.value = displayValue.join('');
    }

    if (keyPressed.keyCode == 189 || keyPressed.keyCode == 187 || keyPressed.keyCode == 191 || keyPressed.keyCode == 56) {
        decimalCount = 0;
    }
    if (!operationElements[1].toString().includes('.') && keyPressed.keyCode == 8) {
        decimalCount = 0;
    }
}

display.addEventListener('keyup', (keyPressed) => {
    //keyCodes are for '=' or 'ENTER'
    if (!event.shiftKey && keyPressed.keyCode == 187 || keyPressed.keyCode == 13) {getResult()};

    displayValue = display.value;
    
    getOperationElements(displayValue);
    regulateDecimals(keyPressed);
});

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        display.value += button.textContent;
        displayValue = display.value;
        getOperationElements(displayValue);
    });
})

let operationElements;

let floatingPointBtn = document.querySelector('#floating-point');

floatingPointBtn.addEventListener('click', () => {decimalCount++})


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
            if (firstOperand.includes('.')) {
                floatingPointBtn.disabled = true;
            };
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

function getResult() {
    let result = operate(operationElements[0], operationElements[1], operationElements[2]);
    display.value = parseFloat(result.toFixed(5));
    if (operationElements[0] == '/' && operationElements[2] == 0){display.value = 'Sorry, that is not a valid operation.'}
}

equalsBtn.addEventListener('click', () => {getResult()})

const clearBtn = document.querySelector('#clear-btn');

clearBtn.addEventListener('click', () => {
    display.value = '';
    floatingPointBtn.disabled = false;
})

let backspaceBtn = document.querySelector('#backspace');

backspaceBtn.addEventListener('click', () => {
    let displayAsArray = Array.from(display.value);
    displayAsArray.pop();
    display.value = displayAsArray.join('');
    event.stopPropagation();
})