class ElementBuilder {
    newButton(buttonId, buttonClasses, buttonText, parent) {
        var button = document.createElement("button")
        button.id = buttonId
        button.classList = buttonClasses
        button.innerText = buttonText
        if (parent) {
            parent.appendChild(button)
        }
        return button
    }
    newCanvas(canvasId, height, width, parent) {
        var canvas = document.createElement("canvas")
        canvas.id = canvasId
        canvas.height = height
        canvas.width = width
        if (parent) {
            parent.appendChild(canvas)
        }
        return canvas
    }
    newDiv(divId, divClasses, parent) {
        var div = document.createElement("div")
        div.id = divId
        div.classList = divClasses
        if (parent) {
            parent.appendChild(div)
        }
        return div
    }
}