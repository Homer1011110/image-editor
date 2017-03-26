<script>
import Vue from "vue"
import Sprite from "./Sprite.vue"
import CircleSprite from "./CircleSprite.vue"
import eventBus from "../base/eventBus"

export default {
  data: function() {
    return {
      isCreatingSprite: false,//is user dragging to create a sprite
      sampleImgUrl: "http://localhost:8089/imgs/bg-1.jpg",
      isImgLoaded: false,
      bgCanvasWidth: 300,
      bgCanvasHeight: 300,
      bgContext: null,
      showDragLayer: false,//control the darglayer to show or hide
      sprites: [],
      activeSprite: null,
      spriteClassRandom: 0,// NOTE: for test
      selectedSprite: null
    }
  },
  components: {
    "rect-sprite": Sprite,
    "circle-sprite": CircleSprite
  },
  render: function(h) {
    return (
      <section class="canvas-section">
        <div class="bg-canvas-wrapper"
          onMousedown = {this.mousedown}
          onMousemove = {this.mousemove}
          onMouseup = {this.mouseup}
        >
          <canvas class="bg-canvas"
            width = {this.bgCanvasWidth}
            height = {this.bgCanvasHeight}
            style = {{display: this.isImgLoaded ? "block" : "none"}}
            ref="bgCanvas"
          ></canvas>
          <div class="drag-layer" style={{display: this.showDragLayer ? "block" : "none"}}></div>
          {
            this.sprites.map(function(sprite) {
              return h(
                sprite.name,
                {
                  attrs: {
                    offsetX: sprite.offsetX,
                    offsetY: sprite.offsetY,
                    startX: sprite.startX,
                    startY: sprite.startY
                  }
                },
                []
              )
            })
          }
        </div>
      </section>
    )
  },
  created: function() {
    let self = this
    let sampleImg = new Image()
    sampleImg.src = this.sampleImgUrl
    sampleImg.onload = function() {
      self.isImgLoaded = true
      self.bgCanvasWidth = this.width
      self.bgCanvasHeight = this.height
      self.$nextTick(function() {
        self.bgContext = self.$refs.bgCanvas.getContext("2d")
        self.drawBackground(sampleImg)
      })
    }
    // self.initKeyBoardListeners()

    eventBus.$on("spriteselected", function(sprite) {
      console.log(sprite)
      self.selectedSprite = sprite
      self.showDragLayer = true
    })
  },
  methods: {
    initKeyBoardListeners: function(e) {
      // NOTE: is it suitable to bind keydown/keyup listener here?
      window.onkeydown = ({ctrlKey})=> {
        if(!this.showDragLayer && ctrlKey) {
          this.showDragLayer = true
        }
      }
      window.onkeyup = ({ctrlKey})=> {
        if(this.showDragLayer && !ctrlKey) {
          this.showDragLayer = false
        }
      }
    },
    mousedown: function({offsetX, offsetY, button}) {
      if(button != 0 || !this.showDragLayer || !this.selectedSprite) {
        return
      }
      this.isCreatingSprite = true
      let sprite = {
        startX: offsetX,
        startY: offsetY,
        offsetX: offsetX,
        offsetY: offsetY
      }
      sprite.name = this.selectedSprite
      this.sprites.push(sprite)
      this.activeSprite = sprite
    },
    mousemove: function({offsetX, offsetY, button, target}) {
      if(button != 0 || !this.showDragLayer) {
        return
      }
      if(!this.isCreatingSprite) {
        return
      }
      if(!this.activeSprite) {
        console.warn(`this.activeSprite is ${this.activeSprite}`)
        return
      }
      this.activeSprite.offsetX = offsetX
      this.activeSprite.offsetY = offsetY
    },
    mouseup: function({offsetX, offsetY, button}) {
      if(button != 0 || !this.showDragLayer) {
        return
      }
      this.isCreatingSprite = false
      this.activeSprite = null
      this.showDragLayer = false
      eventBus.$emit("spritecreate")
    },
    drawBackground: function(img) {
      this.bgContext.drawImage(img, 0, 0)
    }
  }
}
</script>

<style lang="css" scoped>
.canvas-section {
  text-align: center;
  font-size: 0;
}
.bg-canvas-wrapper {
  position: relative;
  display: inline-block;
  z-index: 5;
}
.bg-canvas {
  max-width: 800px;
  min-width: 500px;
  margin: 0 auto;
  border: 1px solid black;
}
.drag-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: block;
  z-index: 1;
}
</style>
