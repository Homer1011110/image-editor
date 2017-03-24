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
