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
    newHeader(headerSize, headerId, headerClasses, headerStyle, headerText, parent) {
        var header = document.createElement("h" + headerSize)
        header.id = headerId
        header.classList = headerClasses
        header.style = headerStyle
        header.innerText = headerText
        if (parent) {
            parent.appendChild(header)
        }
        return header
    }
    newImage(imageId, imageClasses, imageStyle, imageSrc, parent) {
        var img = document.createElement("img")
        img.id = imageId
        img.classList = imageClasses
        img.style = imageStyle
        img.src = imageSrc
        if (parent) {
            parent.appendChild(img)
        }
        return img
    }
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }  
    return array;
}