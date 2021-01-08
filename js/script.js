class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.currentOperandElement = currentOperandElement
        this.previousOperandElement = previousOperandElement
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    clearAll() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    clear() {
        this.currentOperand = 0
    }

    formatNumber(number) {
        const strNumber = number.toString().split('.')
        const int = parseFloat(strNumber[0])
        const dec = strNumber[1]

        let intDisplay

        if (isNaN(int)) {
            intDisplay = ''
        } else {
            intDisplay = int.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (dec != null) {
            return `${intDisplay}.${dec}`
        } else {
            return intDisplay
        }
    }

    addNumber(value) {
        this.currentOperand = this.currentOperand.toString() + value.toString()
    }

    getOperation(value) {
        if (this.currentOperand === '') return

        if (this.previousOperand !== '') {
            this.calculate()
        }
        this.operation = value
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calculate() {
        let result

        const prev = parseFloat(this.previousOperand)
        const cur = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(cur)) return

        switch(this.operation) {
            case '+':
                result = prev + cur
                break
            case '-':
                result = prev - cur
                break
            case 'x':
                result = prev * cur
                break
            case '/':
                result = prev / cur
                break
            default:
                return
        }
        this.currentOperand = result
        this.previousOperand = ''
        this.operation = undefined
    }

    display() {
        this.currentOperandElement.innerText = this.formatNumber(this.currentOperand)

        if(this.operation != null) {
            this.previousOperandElement.innerText = `${this.formatNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandElement.innerText = ''
        }
    }
}

const DOM = {
    numberBtns: '[btn-number]',
    operationBtns: '[btn-operation]',
    equalBtn: '[btn-equals]',
    deleteBtn: '[btn-delete]',
    allClearBtn: '[btn-all-clear]',
    clearBtn: '[btn-clear]',
    previousOperandElement: '[box-previous-operand]',
    currentOperandElement: '[box-current-operand]'
}

const calculator = new Calculator(document.querySelector(DOM.previousOperandElement), document.querySelector(DOM.currentOperandElement))

document.querySelectorAll(DOM.numberBtns).forEach(el => {
    el.addEventListener('click', () => {
        calculator.addNumber(el.innerText)
        calculator.display()
    })  
})

document.querySelectorAll(DOM.operationBtns).forEach(el => {
    el.addEventListener('click', () => {
        calculator.getOperation(el.innerText)
        calculator.display()
    })
})

document.querySelector(DOM.equalBtn).addEventListener('click', () => {
    calculator.calculate()
    calculator.display()
})

document.querySelector(DOM.deleteBtn).addEventListener('click', () => {
    calculator.delete()
    calculator.display()
})

document.querySelector(DOM.allClearBtn).addEventListener('click', () => {
    calculator.clearAll()
    calculator.display()
})

document.querySelector(DOM.clearBtn).addEventListener('click', () => {
    calculator.clear()
    calculator.display()
})