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

let operationElements;

function getOperationElements(string) {
    let operationAsString = string;
    let operationElementsArray = Array.from(operationAsString);

    let numbers = '0123456789.-';

    let firstOperand = '';
    let secondOperand = '';
    let operator;

    //if the element is a number and an operator has not been declared yet, the number/numbers will be added to the first operand; 
    //if an operator was already declared, the number/numbers will be added to the second operand, since it means the first one was already declared;
    operationElementsArray.forEach((element) => {
        //first if statement manages negative numbers by adding '-' to the operator if the firstOperand was already declared
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
            if (secondOperand.includes('.')) {
                floatingPointBtn.disabled = true};
        }
    })

    operationElements = [operator, firstOperand, secondOperand];
}

let floatingPointBtn = document.querySelector('#floating-point');
let decimalCount = 0;

floatingPointBtn.addEventListener('click', () => {decimalCount++})

function regulateDecimals(keyPressed) {
    //keyCode 190 belongs to '.'
    if (keyPressed.keyCode == 190) {decimalCount++};
    
    if (decimalCount > 1 && keyPressed.keyCode == 190) {
        displayValue = Array.from(display.value);
        displayValue.pop();
        display.value = displayValue.join('');
    }

    //resets decimalCount when an operator is added, ensuring that a decimal can be added to the 2nd operand 
    if (keyPressed.keyCode == 189 || keyPressed.keyCode == 187 || keyPressed.keyCode == 191 || keyPressed.keyCode == 56) {decimalCount = 0;}

    //ensures that 2 decimals cannot be added to the operand by adding one operator to reset the decimalCount and removing the operator with backspace
    if (!operationElements[1].toString().includes('.') && operationElements[0] == undefined) {
        decimalCount = 0; 
        floatingPointBtn.disabled = false
    }
    if (operationElements[1].toString().includes('.') && operationElements[0] == undefined) {decimalCount = 1;}

    if (!operationElements[2].toString().includes('.') && operationElements[0]) {
        decimalCount = 0; 
        floatingPointBtn.disabled = false
    }
    if (operationElements[2].toString().includes('.') && operationElements[0]) {decimalCount = 1;}
}

function getResult() {
    let result = operate(operationElements[0], parseFloat(operationElements[1]), parseFloat(operationElements[2]));
    display.value = parseFloat(result.toFixed(5));
    if (operationElements[0] == '/' && operationElements[2] == 0){display.value = 'Sorry, that is not a valid operation.'}
}

//button functionality
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        display.value += button.textContent;
        displayValue = display.value;
        getOperationElements(displayValue);
    });
})

//keyboard functionality
display.addEventListener('keyup', (keyPressed) => {
    //keyCodes are for '=' or 'ENTER'
    if (!event.shiftKey && keyPressed.keyCode == 187 || keyPressed.keyCode == 13) {getResult()};

    displayValue = display.value;
    
    getOperationElements(displayValue);
    regulateDecimals(keyPressed);
});

const equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', () => {getResult()});

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

buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
        button.style.opacity = '70%'
    })
    button.addEventListener('mouseout', () => {
        button.style.opacity = '100%'
    })
})

let functionBtns = document.querySelectorAll('.function-button');

functionBtns.forEach((button) => {
    button.addEventListener('mouseenter', () => {
        button.style.opacity = '70%'
    })
    button.addEventListener('mouseout', () => {
        button.style.opacity = '100%'
    })
})