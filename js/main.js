const numbers = document.querySelectorAll('.num')
const signs = document.querySelectorAll('.sign')
const clearButton = document.querySelector('.c')
const removeButton = document.querySelector('.r')
const dot = document.querySelector('.dot')
const equal = document.querySelector('.equal')
const display = document.querySelector('input')

class Calculator {
	signView
	signOperator
	operators = ['+', '-', '✕', '÷']
	isDot = false

	setDisplay (value) {
		display.value += value
	}

	get lastValue () {
		return display.value[display.value.length - 1]
	}

	get firstValue () {
		return display.value[0]
	}

	numbers (event) {
		const num = +event.target.textContent.trim()

		if(
			this.lastValue == 0 && display.value.length == 1
		) return display.value = num

		if(
			this.lastValue == 0 && this.signOperator
		) return display.value = display.value.slice(0, -1) + num

		return this.setDisplay(num)
	}

	signs (event) {
		const signView = event.target.textContent.trim()
		const signOperator = event.target.dataset.sign.trim()

		if(
			this.operators.includes(this.lastValue)
		) return display.value = display.value.slice(0, -1) + signView

		if(
			!display.value.length ||
			this.lastValue == '.' || this.signOperator
		) return

		this.signView = signView
		this.signOperator = signOperator
		this.isDot = false

		return this.setDisplay(signView)
	}

	dot () {
		if(
			!display.value ||
			this.operators.includes(this.lastValue)
		) {
			display.value = display.value + '0.'
			return this.isDot = true
		}

		if(
			this.lastValue == '.' ||
			this.isDot
		) return 

		this.isDot = true

		return this.setDisplay('.')
	}

	calculate () {
		const [num1, num2] = display.value.split(this.signView)

		display.value = eval(num1 + this.signOperator + num2)

		this.signView = null
		this.signOperator = null
		
		if(display.value.includes('.')) {
			this.isDot = true
		}
	}

	clear () {
		display.value = null

		this.signView = null
		this.signOperator = null
		this.isDot = false
	}

	remove () {
		if(
			this.operators.includes(this.lastValue)
		) {
			this.signView = null
			this.signOperator = null
			if(display.value.includes('.')) {
				this.isDot = true
			}
		}

		if(this.lastValue == '.') {
			this.isDot = false
		}

		display.value = display.value.slice(0, -1)
	}
}

let calculator = new Calculator()

for(let number of numbers) {
	number.onclick = (event) => {
		return calculator.numbers(event)
	}
}

for(let sign of signs) {
	sign.onclick = (event) => {
		return calculator.signs(event)
	}
}

dot.onclick = () => {
	calculator.dot()
}

clearButton.onclick = () => {
	calculator.clear()
}

removeButton.onclick = () => {
	calculator.remove()
}

equal.onclick = () => {
	calculator.calculate()
}