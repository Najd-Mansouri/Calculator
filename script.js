let firstOperand = '';
let secondOperand = '';
let operator = null;


const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.display');


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error('Cannot divide by zero');
    }

    return a / b;
}

function multiply(a, b) {
    return a * b;
}
