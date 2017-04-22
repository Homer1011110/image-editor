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
        centerX: offsetX,
        centerY: offsetY,
        width: 0,
        height: 0,
        contentWidth: 0,
        contentHeight: 0,
        rotateAngle: 0, // radius
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
        this.activeSprite.contentWidth = this.activeSprite.width
        this.activeSprite.contentHeight = this.activeSprite.height
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
        let angle = this.activeSprite.rotateAngle
        let radians, w, h
        let sin = Math.sin, cos = Math.cos
        if(angle >= 180) {
          angle -= 180
        }
        if(angle < 90) {
          radians = angle / 180 * Math.PI
          w = (this.activeSprite.height * sin(radians) - this.activeSprite.width * cos(radians)) / (sin(radians) * sin(radians) - cos(radians) * cos(radians))
          h = (this.activeSprite.width * sin(radians) - this.activeSprite.height * cos(radians)) / (sin(radians) * sin(radians) - cos(radians) * cos(radians))
        } else {
          radians = (angle - 90) / 180 * Math.PI
          w = (this.activeSprite.width * sin(radians) - this.activeSprite.height * cos(radians)) / (sin(radians) * sin(radians) - cos(radians) * cos(radians))
          h = (this.activeSprite.height * sin(radians) - this.activeSprite.width * cos(radians)) / (sin(radians) * sin(radians) - cos(radians) * cos(radians))
        }
        this.activeSprite.contentWidth = w
        this.activeSprite.contentHeight = h
      }
      this.activeSprite.centerX = this.activeSprite.x + this.activeSprite.width / 2
      this.activeSprite.centerY = this.activeSprite.y + this.activeSprite.height / 2
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
    SpriteMouseDownHandler: function(index, {button, offsetX, offsetY, target}, borderWidth) {
      if(button != 0) {
        return
      }
      let sin = Math.sin, cos = Math.cos
      this.activeSprite.isActive = false
      this.activeSprite = this.sprites[index]
      this.activeSprite.isActive = true
      this.showDragLayer = true
      this.saveSpriteOldState()
      if(/resize/.test(target.className)) {
        // NOTE: resize
        console.log("resize")
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
      } else if(/rotate/.test(target.className)) {
        // NOTE: rotate
        console.log("rotate")
      } else if(/sprite-content/.test(target.className)) {
        // NOTE: move
        let angle = -this.activeSprite.rotateAngle
        let radians = angle / 180 * Math.PI
        let xr = this.activeSprite.x + this.activeSprite.width / 2
        let yr = this.activeSprite.y + this.activeSprite.height / 2
        let x0 = this.activeSprite.x + this.activeSprite.width / 2 - this.activeSprite.contentWidth / 2 + offsetX + borderWidth
        let y0 = this.activeSprite.y + this.activeSprite.height / 2 - this.activeSprite.contentHeight / 2 + offsetY + borderWidth
        let x1 = xr + (x0 - xr) * cos(radians) - (yr - y0) * sin(radians)
        let y1 = yr - (x0 - xr) * sin(radians) - (yr - y0) * cos(radians)
        this.activeSprite.mousedownX = x1
        this.activeSprite.mousedownY = y1
        // console.log("xr: ", xr, "yr: ", yr, "radians: ", radians)
        // console.log("x0: ", x0, "y0: ", y0)
        // console.log("mousedownX:", this.activeSprite.mousedownX, "mousedownY: ", this.activeSprite.mousedownY)
        this.isMovingSprite = true
      }
    },
    spriteRotateHandler: function(angle) {
      this.activeSprite.rotateAngle = angle
      let radians, w, h
      let sin = Math.sin, cos = Math.cos
      if(angle >= 180) {
        angle -= 180
      }
      if(angle < 90) {
        radians = angle / 180 * Math.PI
        w = this.activeSprite.contentWidth * cos(radians) + this.activeSprite.contentHeight * sin(radians)
        h = this.activeSprite.contentWidth * sin(radians) + this.activeSprite.contentHeight * cos(radians)
      } else {
        radians = (angle - 90) / 180 * Math.PI
        w = this.activeSprite.contentHeight * cos(radians) + this.activeSprite.contentWidth * sin(radians)
        h = this.activeSprite.contentHeight * sin(radians) + this.activeSprite.contentWidth * cos(radians)
      }
      this.activeSprite.x = this.activeSprite.x + this.activeSprite.width / 2 - w / 2
      this.activeSprite.y = this.activeSprite.y + this.activeSprite.height / 2 - h / 2
      this.activeSprite.width = w
      this.activeSprite.height = h
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
