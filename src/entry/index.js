let bgCanvas = document.querySelector("#bg-canvas")
let bgCanvasWrapper = document.querySelector("#bg-canvas-wrapper")
let dragLayer = document.querySelector("#drag-layer")

if(!bgCanvas.getContext) {
  throw "your browser do not support canvas api"
}
let bgContext = bgCanvas.getContext("2d")

// print rect
// ctx.fillRext(x, y, width, height)
// ctx.strokeRect(x, y, width, height)
// ctx.clearRect(x, y, width, height)
// ctx.lineWidth = 10
// ctx.lineCap = "butt | round | square"
// ctx.lineJoin=  "round | bevel | miter"
let bgImg = document.querySelector("#bg-img")
bgImg.onload = function(e) {
  let imgData = document.querySelector("#img-data")
  imgData.innerHTML = `width: ${this.width}<br/>height: ${this.height}`
  // NOTE: canvas's content will be clear when you reset the width or height attribute
  bgCanvas.width = this.width
  bgCanvas.height = this.height
  bgContext.drawImage(bgImg, 0, 0)
  bgCanvas.style.display = "block"
}
// NOTE: this operation will draw the whole image and may stretch the image
// bgContext.drawImage(bgImg, 0, 0, 200, 300)
let isCreatingSprite = false
let startX, startY
let sprite
let paintCount = 0
bgCanvasWrapper.onmousedown = function({offsetX, offsetY, button}) {
  if(button !== 0 || !ctrlDown) {
    return
  }
  isCreatingSprite = true
  startX = offsetX
  startY = offsetY
  sprite = document.createElement("div")
  sprite.setAttribute("class", "sprite")
  sprite.style.left = startX + "px"
  sprite.style.top = startY + "px"
  bgCanvasWrapper.append(sprite)
}
bgCanvasWrapper.onmousemove = function({offsetX, offsetY, button}) {
  if(button !== 0 || !ctrlDown) {
    return
  }
  if(!isCreatingSprite) {
    return
  }
  let width = offsetX - startX
  let height = offsetY - startY
  sprite.style.width = `${width}px`
  sprite.style.height = `${height}px`
}
bgCanvasWrapper.onmouseup = function({offsetX, offsetY, button}) {
  if(button !== 0 || !ctrlDown) {
    return
  }
  isCreatingSprite = false
  sprite = null
}

let ctrlDown = false
window.onkeydown = function(e) {
  // e.preventDefault()
  if(!ctrlDown && e.ctrlKey) {
    ctrlDown = true
    dragLayer.style.display = "block"
  }
}
window.onkeyup = function(e) {
  // e.preventDefault()
  if(ctrlDown && !e.ctrlKey) {
    ctrlDown = false
    dragLayer.style.display = "none"
  }
}