let div = document.querySelector('div')
let body = document.querySelector('body')


let initialX = 0
let initialY = 0
let currentX = 0
let currentY = 0
let offsetX = 0
let offsetY = 0

let active = false

body.addEventListener("mousedown", (event) => {
	initialX = event.clientX - offsetX
	initialY = event.clientY - offsetY

	if(event.target === div) {
		active = true
	}

})

body.addEventListener("mouseup", (event) => {
	initialX = currentX
    initialY = currentY
	active = false
})

body.addEventListener("mousemove", (event) => {
	if(active) {
		currentX = event.clientX - initialX
   		currentY = event.clientY - initialY

		offsetX = currentX
    	offsetY = currentY

		div.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
	}
})
