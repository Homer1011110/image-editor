// console.log("store")
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

class SpriteModel {
  constructor(name, offsetX, offsetY) {
    this.startX = offsetX,
    this.startY = offsetY,
    this.mousedownX = offsetX,// coordinate of mousedown when create|move|resize
    this.mousedownY = offsetY,//
    this.x = offsetX,// coordinate of sprite
    this.y = offsetY,
    this.centerX = offsetX,
    this.centerY = offsetY,
    this.width = 0,
    this.height = 0,
    this.contentWidth = 0,
    this.contentHeight = 0,
    this.rotateAngle = 0, // radius
    this.isActive = true,
    this.isMoving = false,
    this.name = name
  }
}

let store = new Vuex.Store({
  state: {
    // NOTE: ImageEditor State
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
  },
  // NOTE: use store.commit("mutationsName", data)
  mutations: {
    spriteSelected: function(state, {sprite}) {
      state.selectedSprite = sprite
      state.showDragLayer = true
      if(state.activeSprite) {
        state.activeSprite.isActive = false
      }
    },
    canvasMousedown: function(state, {offsetX, offsetY, button}) {
      if(button != 0 || !state.showDragLayer || !state.selectedSprite) {
        return
      }
      state.isCreatingSprite = true
      let sprite = new SpriteModel(state.selectedSprite, offsetX, offsetY)
      state.sprites.push(sprite)
      state.activeSprite = sprite
    },
    dragLayerMousemove: function(state, {offsetX, offsetY, button, target}) {
      if(button != 0 || !state.showDragLayer) {
        return
      }
      if(!state.activeSprite) {
        console.warn(`this.activeSprite is ${state.activeSprite}`)
        return
      }
      if(state.isCreatingSprite) {
        state.activeSprite.x = Math.min(state.activeSprite.startX, offsetX)
        state.activeSprite.y = Math.min(state.activeSprite.startY, offsetY)
        state.activeSprite.width = Math.abs(state.activeSprite.startX - offsetX)
        state.activeSprite.height = Math.abs(state.activeSprite.startY - offsetY)
        state.activeSprite.contentWidth = state.activeSprite.width
        state.activeSprite.contentHeight = state.activeSprite.height
      } else if(state.isMovingSprite){
        state.activeSprite.x = state.activeSpriteOldState.x + (offsetX - state.activeSprite.mousedownX)
        state.activeSprite.y = state.activeSpriteOldState.y + (offsetY - state.activeSprite.mousedownY)
      } else if(state.isResizingSprite) {
        let diffX = offsetX - state.activeSprite.mousedownX
        let diffY = offsetY - state.activeSprite.mousedownY
        switch (state.activeSprite.dragDot) {
          case "left-top":
            state.activeSprite.x = Math.min(state.activeSpriteOldState.x + diffX, state.activeSpriteOldState.x + state.activeSpriteOldState.width)
            state.activeSprite.y = Math.min(state.activeSpriteOldState.y + diffY, state.activeSpriteOldState.y + state.activeSpriteOldState.height)
            state.activeSprite.width = Math.abs(state.activeSpriteOldState.width - diffX)
            state.activeSprite.height = Math.abs(state.activeSpriteOldState.height - diffY)
            break
          case "right-top":
            state.activeSprite.x = Math.min(state.activeSpriteOldState.x, state.activeSpriteOldState.x + state.activeSpriteOldState.width + diffX)
            state.activeSprite.y = Math.min(state.activeSpriteOldState.y + diffY, state.activeSpriteOldState.y + state.activeSpriteOldState.height)
            state.activeSprite.width = Math.abs(state.activeSpriteOldState.width + diffX)
            state.activeSprite.height = Math.abs(state.activeSpriteOldState.height - diffY)
            break
          case "right-bottom":
            state.activeSprite.x = Math.min(state.activeSpriteOldState.x, state.activeSpriteOldState.x + state.activeSpriteOldState.width + diffX)
            state.activeSprite.y = Math.min(state.activeSpriteOldState.y, state.activeSpriteOldState.y + state.activeSpriteOldState.height + diffY)
            state.activeSprite.width = Math.abs(state.activeSpriteOldState.width + diffX)
            state.activeSprite.height = Math.abs(state.activeSpriteOldState.height + diffY)
            break
          case "left-bottom":
            state.activeSprite.x = Math.min(state.activeSpriteOldState.x + diffX, state.activeSpriteOldState.x + state.activeSpriteOldState.width)
            state.activeSprite.y = Math.min(state.activeSpriteOldState.y, state.activeSpriteOldState.y + state.activeSpriteOldState.height + diffY)
            state.activeSprite.width = Math.abs(state.activeSpriteOldState.width - diffX)
            state.activeSprite.height = Math.abs(state.activeSpriteOldState.height + diffY)
            break
        }
        let angle = state.activeSprite.rotateAngle
        let radians, w, h
        let sin = Math.sin, cos = Math.cos
        if(angle >= 180) {
          angle -= 180
        }
        if(angle < 90) {
          radians = angle / 180 * Math.PI
          w = (state.activeSprite.height * sin(radians) - state.activeSprite.width * cos(radians)) / (sin(radians) * sin(radians) - cos(radians) * cos(radians))
          h = (state.activeSprite.width * sin(radians) - state.activeSprite.height * cos(radians)) / (sin(radians) * sin(radians) - cos(radians) * cos(radians))
        } else {
          radians = (angle - 90) / 180 * Math.PI
          w = (state.activeSprite.width * sin(radians) - state.activeSprite.height * cos(radians)) / (sin(radians) * sin(radians) - cos(radians) * cos(radians))
          h = (state.activeSprite.height * sin(radians) - state.activeSprite.width * cos(radians)) / (sin(radians) * sin(radians) - cos(radians) * cos(radians))
        }
        state.activeSprite.contentWidth = w
        state.activeSprite.contentHeight = h
      }
      state.activeSprite.centerX = state.activeSprite.x + state.activeSprite.width / 2
      state.activeSprite.centerY = state.activeSprite.y + state.activeSprite.height / 2
    },
    dragLayerMouseup: function(state, {offsetX, offsetY, button}) {
      if(button != 0 || !state.showDragLayer) {
        return
      }
      state.isCreatingSprite = false
      state.isMovingSprite = false
      state.isResizingSprite = false
      state.showDragLayer = false
      state.selectedSprite = null
    },
    spriteMousedown: function(state, {index, borderWidth, button, offsetX, offsetY, target}) {
      if(button != 0) {
        return
      }
      let sin = Math.sin, cos = Math.cos
      state.activeSprite.isActive = false
      state.activeSprite = state.sprites[index]
      state.activeSprite.isActive = true
      state.showDragLayer = true
      
      /* save sprite's old state */
      let {x, y, width, height} = state.activeSprite
      state.activeSpriteOldState = {x, y, width, height}

      if(/resize/.test(target.className)) {
        // NOTE: resize
        console.log("resize")
        if(/left-top/.test(target.className)) {
          state.activeSprite.mousedownX = state.activeSprite.x - 5 + offsetX
          state.activeSprite.mousedownY = state.activeSprite.y - 5 + offsetY
          state.activeSprite.dragDot = "left-top"
        } else if(/right-top/.test(target.className)) {
          state.activeSprite.mousedownX = state.activeSprite.x + state.activeSprite.width - 5 + offsetX
          state.activeSprite.mousedownY = state.activeSprite.y - 5 + offsetY
          state.activeSprite.dragDot = "right-top"
        } else if(/right-bottom/.test(target.className)) {
          state.activeSprite.mousedownX = state.activeSprite.x + state.activeSprite.width - 5 + offsetX
          state.activeSprite.mousedownY = state.activeSprite.y + state.activeSprite.height - 5 + offsetY
          state.activeSprite.dragDot = "right-bottom"
        } else if(/left-bottom/.test(target.className)) {
          state.activeSprite.mousedownX = state.activeSprite.x - 5 + offsetX
          state.activeSprite.mousedownY = state.activeSprite.y + state.activeSprite.height - 5 + offsetY
          state.activeSprite.dragDot = "left-bottom"
        }
        state.isResizingSprite = true
      } else if(/rotate/.test(target.className)) {
        // NOTE: rotate
        console.log("rotate")
      } else if(/sprite-content/.test(target.className)) {
        // NOTE: move
        let angle = -state.activeSprite.rotateAngle
        let radians = angle / 180 * Math.PI
        let xr = state.activeSprite.x + state.activeSprite.width / 2
        let yr = state.activeSprite.y + state.activeSprite.height / 2
        let x0 = state.activeSprite.x + state.activeSprite.width / 2 - state.activeSprite.contentWidth / 2 + offsetX + borderWidth
        let y0 = state.activeSprite.y + state.activeSprite.height / 2 - state.activeSprite.contentHeight / 2 + offsetY + borderWidth
        let x1 = xr + (x0 - xr) * cos(radians) - (yr - y0) * sin(radians)
        let y1 = yr - (x0 - xr) * sin(radians) - (yr - y0) * cos(radians)
        state.activeSprite.mousedownX = x1
        state.activeSprite.mousedownY = y1
        // console.log("xr: ", xr, "yr: ", yr, "radians: ", radians)
        // console.log("x0: ", x0, "y0: ", y0)
        // console.log("mousedownX:", state.activeSprite.mousedownX, "mousedownY: ", state.activeSprite.mousedownY)
        state.isMovingSprite = true
      }
    },
    spriteRotate: function(state, {angle}) {
      state.activeSprite.rotateAngle = angle
      let radians, w, h
      let sin = Math.sin, cos = Math.cos
      if(angle >= 180) {
        angle -= 180
      }
      if(angle < 90) {
        radians = angle / 180 * Math.PI
        w = state.activeSprite.contentWidth * cos(radians) + state.activeSprite.contentHeight * sin(radians)
        h = state.activeSprite.contentWidth * sin(radians) + state.activeSprite.contentHeight * cos(radians)
      } else {
        radians = (angle - 90) / 180 * Math.PI
        w = state.activeSprite.contentHeight * cos(radians) + state.activeSprite.contentWidth * sin(radians)
        h = state.activeSprite.contentHeight * sin(radians) + state.activeSprite.contentWidth * cos(radians)
      }
      state.activeSprite.x = state.activeSprite.x + state.activeSprite.width / 2 - w / 2
      state.activeSprite.y = state.activeSprite.y + state.activeSprite.height / 2 - h / 2
      state.activeSprite.width = w
      state.activeSprite.height = h
    }
  },
  actions: {}
})

export default store
