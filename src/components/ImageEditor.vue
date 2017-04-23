<script>
import Vue from "vue"
import {mapState, mapAction} from "vuex"

import Sprite from "./Sprite.vue"
import CircleSprite from "./CircleSprite.vue"
import eventBus from "../base/eventBus"

export default {
  components: {
    "rect-sprite": Sprite,
    "circle-sprite": CircleSprite
  },
  render: function(h) {
    return (
      <section class="canvas-section">
        <div class="bg-canvas-wrapper"
        >
          <canvas class="bg-canvas"
            width = {this.bgCanvasWidth}
            height = {this.bgCanvasHeight}
            style = {{display: this.isImgLoaded ? "block" : "none"}}
            ref="bgCanvas"
          ></canvas>
          <div class="drag-layer"
            style={{display: this.showDragLayer ? "block" : "none"}}
            onMousedown = {this.mousedown}
            onMousemove = {this.mousemove}
            onMouseup = {this.mouseup}
          ></div>
          {
            this.sprites.map((sprite, index)=> {
              return h(
                sprite.name,
                {
                  props: {
                    width: sprite.width,
                    height: sprite.height,
                    x: sprite.x,
                    y: sprite.y,
                    isActive: sprite.isActive,
                    name: sprite.name,
                    contentWidth: sprite.contentWidth,
                    contentHeight: sprite.contentHeight
                  },
                  on: {
                    spriteContentMousedown: (e, borderWidth)=>{
                      this.SpriteMouseDownHandler(index, e, borderWidth)
                    },
                    spriteRotate: (angle)=>{
                      this.spriteRotateHandler(angle)
                    }
                  },
                  ref: `sprite-${index}`
                }
              )
            })
          }
        </div>
      </section>
    )
  },
  computed: mapState([
    'isCreatingSprite',
    'isMovingSprite',
    'isResizingSprite',
    'showDragLayer',
    'sprites',
    'activeSprite',
    'activeSpriteOldState',
    'selectedSprite'
  ]),
  data: function() {
    return {
      sampleImgUrl: "http://localhost:8089/imgs/bg-2.jpg",
      isImgLoaded: false,
      bgCanvasWidth: 300,
      bgCanvasHeight: 300,
      bgContext: null
    }
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
  },
  methods: {
    mousedown: function({offsetX, offsetY, button}) {
      this.$store.commit("canvasMousedown", {offsetX, offsetY, button})
    },
    mousemove: function({offsetX, offsetY, button, target}) {
      this.$store.commit("dragLayerMousemove", {offsetX, offsetY, button, target})
    },
    mouseup: function({offsetX, offsetY, button}) {
      this.$store.commit("dragLayerMouseup", {offsetX, offsetY, button})
    },
    SpriteMouseDownHandler: function(index, {button, offsetX, offsetY, target}, borderWidth) {
      this.$store.commit("spriteMousedown", {
        index,
        borderWidth,
        button,
        offsetX,
        offsetY,
        target
      })
    },
    spriteRotateHandler: function(angle) {
      this.$store.commit("spriteRotate", {angle})
    },
    drawBackground: function(img) {
      this.bgContext.drawImage(img, 0, 0)
    }
  }
}
</script>

<style lang="css" scoped>
.canvas-section {
  font-size: 0;
}
.bg-canvas-wrapper {
  position: relative;
  display: inline-block;
  z-index: 10;
  overflow: hidden;
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
  z-index: 10;
  background-color: rgba(248, 0, 0, 0.5);
}
</style>
