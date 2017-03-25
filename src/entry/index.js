import Vue from "vue"
import ImageEditor from "../components/ImageEditor.vue"
import SpriteSelectBox from "../components/SpriteSelectBox.vue"

let app = new Vue({
  el: "#ie-container",
  data: {},
  components: {
    "image-editor": ImageEditor,
    "sprite-select-box": SpriteSelectBox
  }
})
// print rect
// ctx.lineWidth = 10
// ctx.lineCap = "butt | round | square"
// ctx.lineJoin=  "round | bevel | miter"
// let bgImg = document.querySelector("#bg-img")
