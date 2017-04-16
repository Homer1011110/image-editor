<script>
import Vue from "vue"
import Sprite from "./Sprite.vue"
import CircleSprite from "./CircleSprite.vue"
import eventBus from "../base/eventBus"

export default {
  data: function() {
    return {
      isCreatingSprite: false,//is user dragging to create a sprite
      isMovingSprite: false,
      sampleImgUrl: "http://localhost:8089/imgs/bg-1.jpg",
      isImgLoaded: false,
      bgCanvasWidth: 300,
      bgCanvasHeight: 300,
      bgContext: null,
      showDragLayer: false,//control the darglayer to show or hide
      sprites: [],
      activeSprite: null,
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
                    isActive: sprite.isActive
                  },
                  on: {
                    spriteContentMousedown: (e)=>{
                      this.SpriteMouseDownHandler(index, e)
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
  data: function() {
    return {
      isCreatingSprite: false,//is user dragging to create a sprite
      isMovingSprite: false,
      isResizingSprite: false,
      sampleImgUrl: "http://localhost:8089/imgs/bg-2.jpg",
      isImgLoaded: false,
      bgCanvasWidth: 300,
      bgCanvasHeight: 300,
      bgContext: null,
      showDragLayer: false,//control the darglayer to show or hide
      sprites: [],
      activeSprite: null,
      activeSpriteOldState: null,
      selectedSprite: null
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

    eventBus.$on("spriteselected", function(sprite) {
      self.selectedSprite = sprite
      self.showDragLayer = true
      if(self.activeSprite) {
        self.activeSprite.isActive = false
      }
    })
  },
  methods: {
    mousedown: function({offsetX, offsetY, button}) {
      if(button != 0 || !this.showDragLayer || !this.selectedSprite) {
        return
      }
      this.isCreatingSprite = true
      let sprite = {
        startX: offsetX,
        startY: offsetY,
        mousedownX: offsetX,// coordinate of mousedown when create|move|resize
        mousedownY: offsetY,//
        x: offsetX,// coordinate of sprite
        y: offsetY,
        width: 0,
        height: 0,
        isActive: true,
        isMoving: false
      }
      sprite.name = this.selectedSprite
      this.sprites.push(sprite)
      this.activeSprite = sprite
    },
    mousemove: function({offsetX, offsetY, button, target}) {
      if(button != 0 || !this.showDragLayer) {
        return
      }
      if(!this.activeSprite) {
        console.warn(`this.activeSprite is ${this.activeSprite}`)
        return
      }
      if(this.isCreatingSprite) {
        this.activeSprite.x = Math.min(this.activeSprite.startX, offsetX)
        this.activeSprite.y = Math.min(this.activeSprite.startY, offsetY)
        this.activeSprite.width = Math.abs(this.activeSprite.startX - offsetX)
        this.activeSprite.height = Math.abs(this.activeSprite.startY - offsetY)
      } else if(this.isMovingSprite){
        this.activeSprite.x = this.activeSpriteOldState.x + (offsetX - this.activeSprite.mousedownX)
        this.activeSprite.y = this.activeSpriteOldState.y + (offsetY - this.activeSprite.mousedownY)
      } else if(this.isResizingSprite) {
        let diffX = offsetX - this.activeSprite.mousedownX
        let diffY = offsetY - this.activeSprite.mousedownY
        switch (this.activeSprite.dragDot) {
          case "left-top":
            this.activeSprite.x = Math.min(this.activeSpriteOldState.x + diffX, this.activeSpriteOldState.x + this.activeSpriteOldState.width)
            this.activeSprite.y = Math.min(this.activeSpriteOldState.y + diffY, this.activeSpriteOldState.y + this.activeSpriteOldState.height)
            this.activeSprite.width = Math.abs(this.activeSpriteOldState.width - diffX)
            this.activeSprite.height = Math.abs(this.activeSpriteOldState.height - diffY)
            break
          case "right-top":
            this.activeSprite.x = Math.min(this.activeSpriteOldState.x, this.activeSpriteOldState.x + this.activeSpriteOldState.width + diffX)
            this.activeSprite.y = Math.min(this.activeSpriteOldState.y + diffY, this.activeSpriteOldState.y + this.activeSpriteOldState.height)
            this.activeSprite.width = Math.abs(this.activeSpriteOldState.width + diffX)
            this.activeSprite.height = Math.abs(this.activeSpriteOldState.height - diffY)
            break
          case "right-bottom":
            this.activeSprite.x = Math.min(this.activeSpriteOldState.x, this.activeSpriteOldState.x + this.activeSpriteOldState.width + diffX)
            this.activeSprite.y = Math.min(this.activeSpriteOldState.y, this.activeSpriteOldState.y + this.activeSpriteOldState.height + diffY)
            this.activeSprite.width = Math.abs(this.activeSpriteOldState.width + diffX)
            this.activeSprite.height = Math.abs(this.activeSpriteOldState.height + diffY)
            break
          case "left-bottom":
            this.activeSprite.x = Math.min(this.activeSpriteOldState.x + diffX, this.activeSpriteOldState.x + this.activeSpriteOldState.width)
            this.activeSprite.y = Math.min(this.activeSpriteOldState.y, this.activeSpriteOldState.y + this.activeSpriteOldState.height + diffY)
            this.activeSprite.width = Math.abs(this.activeSpriteOldState.width - diffX)
            this.activeSprite.height = Math.abs(this.activeSpriteOldState.height + diffY)
            break
        }
      }
    },
    mouseup: function({offsetX, offsetY, button}) {
      if(button != 0 || !this.showDragLayer) {
        return
      }
      this.isCreatingSprite = false
      this.isMovingSprite = false
      this.isResizingSprite = false
      this.showDragLayer = false
      eventBus.$emit("spriteactionend")
    },
    SpriteMouseDownHandler: function(index, {button, offsetX, offsetY, target}) {
      if(button != 0) {
        return
      }
      this.activeSprite.isActive = false
      this.activeSprite = this.sprites[index]
      this.activeSprite.isActive = true
      this.showDragLayer = true
      this.saveSpriteOldState()
      if(/dragable/.test(target.className)) {
        // NOTE: resize
        if(/left-top/.test(target.className)) {
          this.activeSprite.mousedownX = this.activeSprite.x - 5 + offsetX
          this.activeSprite.mousedownY = this.activeSprite.y - 5 + offsetY
          this.activeSprite.dragDot = "left-top"
        } else if(/right-top/.test(target.className)) {
          this.activeSprite.mousedownX = this.activeSprite.x + this.activeSprite.width - 5 + offsetX
          this.activeSprite.mousedownY = this.activeSprite.y - 5 + offsetY
          this.activeSprite.dragDot = "right-top"
        } else if(/right-bottom/.test(target.className)) {
          this.activeSprite.mousedownX = this.activeSprite.x + this.activeSprite.width - 5 + offsetX
          this.activeSprite.mousedownY = this.activeSprite.y + this.activeSprite.height - 5 + offsetY
          this.activeSprite.dragDot = "right-bottom"
        } else if(/left-bottom/.test(target.className)) {
          this.activeSprite.mousedownX = this.activeSprite.x - 5 + offsetX
          this.activeSprite.mousedownY = this.activeSprite.y + this.activeSprite.height - 5 + offsetY
          this.activeSprite.dragDot = "left-bottom"
        }
        this.isResizingSprite = true
      } else {
        // NOTE: move
        this.activeSprite.mousedownX = this.activeSprite.x + offsetX
        this.activeSprite.mousedownY =  this.activeSprite.y + offsetY
        this.isMovingSprite = true
      }
    },
    saveSpriteOldState() {
      let {x, y, width, height} = this.activeSprite
      this.activeSpriteOldState = {x, y, width, height}
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
  z-index: 1;
  background-color: rgba(248, 0, 0, 0.5);
}
</style>
