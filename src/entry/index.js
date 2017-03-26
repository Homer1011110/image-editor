import Vue from "vue"
import ImageEditor from "../components/ImageEditor.vue"
import SpriteSelectBox from "../components/SpriteSelectBox.vue"
import BackgroundCover from "../components/BackgroundCover.vue"

let app = new Vue({
  el: "#ie-container",
  data: {},
  components: {
    "image-editor": ImageEditor,
    "sprite-select-box": SpriteSelectBox,
    "background-cover": BackgroundCover
  }
})
// print rect
// ctx.lineWidth = 10
// ctx.lineCap = "butt | round | square"
// ctx.lineJoin=  "round | bevel | miter"
// let bgImg = document.querySelector("#bg-img")
