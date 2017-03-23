import ImageEditor from "../components/ImageEditor.vue"
import Vue from "vue"

let app = new Vue({
  el: "#ie-container",
  data: {},
  components: {
    "image-editor": ImageEditor
  }
})


// print rect
// ctx.lineWidth = 10
// ctx.lineCap = "butt | round | square"
// ctx.lineJoin=  "round | bevel | miter"
// let bgImg = document.querySelector("#bg-img")
// bgImg.onload = function(e) {
//   let imgData = document.querySelector("#img-data")
//   imgData.innerHTML = `width: ${this.width}<br/>height: ${this.height}`
//   // NOTE: canvas's content will be clear when you reset the width or height attribute
//   bgCanvas.width = this.width
//   bgCanvas.height = this.height
//   bgContext.drawImage(bgImg, 0, 0)
//   bgCanvas.style.display = "block"
// }
// // NOTE: this operation will draw the whole image and may stretch the image
// // bgContext.drawImage(bgImg, 0, 0, 200, 300)
// let isCreatingSprite = false
// let startX, startY
// let sprite
// let paintCount = 0
// bgCanvasWrapper.onmousedown = function({offsetX, offsetY, button}) {
//   if(button !== 0 || !ctrlDown) {
//     return
//   }
//   isCreatingSprite = true
//   startX = offsetX
//   startY = offsetY
//   sprite = document.createElement("div")
//   sprite.setAttribute("class", "sprite")
//   bgCanvasWrapper.append(sprite)
// }
// bgCanvasWrapper.onmousemove = function({offsetX, offsetY, button}) {
//   if(button !== 0 || !ctrlDown) {
//     return
//   }
//   if(!isCreatingSprite) {
//     return
//   }
//   let width = offsetX - startX
//   let height = offsetY - startY
//   let x = 0
//   let y = 0
//   if(width < 0) {
//     width = -width
//     x = startX - width
//   } else {
//     x = startX
//   }
//   if(height < 0) {
//     height = -height
//     y = startY - height
//   } else {
//     y = startY
//   }
//   sprite.style.left = `${x}px`
//   sprite.style.top = `${y}px`
//   sprite.style.width = `${width}px`
//   sprite.style.height = `${height}px`
// }
// bgCanvasWrapper.onmouseup = function({offsetX, offsetY, button}) {
//   if(button !== 0 || !ctrlDown) {
//     return
//   }
//   isCreatingSprite = false
//   sprite = null
// }
//
// let ctrlDown = false
// window.onkeydown = function(e) {
//   // e.preventDefault()
//   if(!ctrlDown && e.ctrlKey) {
//     ctrlDown = true
//     dragLayer.style.display = "block"
//   }
// }
// window.onkeyup = function(e) {
//   // e.preventDefault()
//   if(ctrlDown && !e.ctrlKey) {
//     ctrlDown = false
//     dragLayer.style.display = "none"
//   }
// }
