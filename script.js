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

function updateScreen(number) {
    display.textContent = number;
}

function resetState() {
    firstOperand = '';
    secondOperand = '';
    operator = null;
    display.textContent = '0';
}

function handleInput(btn) {
    if (operator === null || firstOperand === '') {
        firstOperand += btn.dataset.number;
        updateScreen(firstOperand);
    } else {
        secondOperand += btn.dataset.number;
        updateScreen(secondOperand);
    }
}

function handleOperator(btn) {
    if (firstOperand === '') return;
    operator = btn.dataset.operator;
    updateScreen(firstOperand)


}

function formatResult(res) {
    if (Number.isInteger(res)) return res.toString();
    if (res.toString().length > 10) return res.toFixed(4);
    return res.toString();
}

function sign() {
    if (operator === null) {
        firstOperand = firstOperand.includes('-') ? firstOperand.slice(1) : '-' + firstOperand;
        updateScreen(firstOperand);
    } else {
        secondOperand = secondOperand.includes('-') ? secondOperand.slice(1) : '-' + secondOperand;
        updateScreen(secondOperand);
    }
}

function deleteLast() {
    if (operator === null) {
        firstOperand = firstOperand.slice(0, -1);
        updateScreen(firstOperand || '0');
    } else {
        secondOperand = secondOperand.slice(0, -1);
        updateScreen(secondOperand || '0');

    }
}

function addDecimal() {
    if (operator === null) {
        if (!firstOperand.includes('.')) {
            firstOperand += firstOperand === '' ? '0.' : '.';
            updateScreen(firstOperand);
        }
    } else {
        if (!secondOperand.includes('.')) {
            secondOperand += secondOperand === '' ? '0.' : '.';
            updateScreen(secondOperand);
        }
    }


}

function simulateClick(btn) {
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 100);
}

function evaluate() {
    const a = parseFloat(firstOperand);
    const b = parseFloat(secondOperand);
    if (operator === null || firstOperand === '' || secondOperand === '') {
        display.textContent = 'Error';
        setTimeout(() => resetState(), 1000);
        return;
    }
    let res;

    try {
        switch (operator) {
            case 'add':
                res = add(a, b);
                break;
            case 'subtract':
                res = subtract(a, b);
                break;
            case 'multiply':
                res = multiply(a, b);
                break;
            case 'divide':
                res = divide(a, b);
                break;

        }
    } catch (error) {
        display.textContent = 'Error';
        setTimeout(() => resetState(), 1000);
        return;
    }
    const formattedResult = formatResult(res);
    updateScreen(formattedResult);
    firstOperand = formattedResult;
    secondOperand = '';
    operator = null;
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        switch (action) {
            case 'number':
                handleInput(btn);
                break;
            case 'operator':
                handleOperator(btn);
                break;
            case 'clear':
                resetState();
                break;
            case 'calculate':
                evaluate();
                break;
            case 'sign':
                sign();
                break;
            case 'delete':
                deleteLast();
                break;
            case 'decimal':
                addDecimal();
                break;



        }
    })
})

function handlePressKey(e) {
    const key = e.key;
    console.log("Key pressed:", key);

    const numberButtons = document.querySelectorAll('.btn[data-action="number"]');
    const operatorButtons = document.querySelectorAll('.btn[data-action="operator"]');

    if (!isNaN(key)) {
        const btn = Array.from(numberButtons).find(btn => btn.dataset.number === key);
        if (btn) {
            // Simulate Click
            simulateClick(btn);
            handleInput(btn);
        }
    } else if (['+', '-', '*', '/'].includes(key)) {
        const operatorMap = {
            '+': 'add',
            '-': 'subtract',
            '*': 'multiply',
            '/': 'divide'
        };
        const btn = Array.from(operatorButtons).find(btn => btn.dataset.operator === operatorMap[key]);
        if (btn) {
            simulateClick(btn);
            handleOperator(btn)

        };
    } else if (key === 'Enter' || key === '=') {
        evaluate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape' || key === 'c') {
        resetState();
    } else if (key === '.') {
        addDecimal();
    }
}

document.addEventListener('keydown', handlePressKey);

