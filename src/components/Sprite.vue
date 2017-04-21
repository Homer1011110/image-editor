<template lang="html">
  <div class="sprite"
    v-bind:style="{left: x+'px', top: y+'px', width: width+'px', height: height+'px'}"
    v-bind:class="[{active: isActive}, name]"
  >
    <div class="sprite-content"
      v-bind:style="{
        border: borderWidth + 'px solid lightblue',
        transform: 'rotate(' + rotateAngle + 'deg)',
        width: contentWidth + 'px',
        height: contentHeight + 'px',
        marginLeft: '-' + contentWidth/2 + 'px',
        marginTop: '-' + contentHeight/2 + 'px'
      }"
      v-bind:class="{unfill: !isFill}"
      v-on:mousedown.top="contentMousedownHandler"
    >
    </div>
    <div class="dragable-wrapper" v-on:mousedown="dragableMousedownHandler">
      <div class="dragable resize drag-bar top"></div>
      <div class="dragable resize drag-bar bottom"></div>
      <div class="dragable resize drag-bar left"></div>
      <div class="dragable resize drag-bar right"></div>
      <div class="dragable resize drag-dot left-top"></div>
      <div class="dragable resize drag-dot right-top"></div>
      <div class="dragable resize drag-dot right-bottom"></div>
      <div class="dragable resize drag-dot left-bottom"></div>
      <!-- <div class="dragable rotate"></div> -->
    </div>
    <sprite-option
      v-on:fillChange="fillChangeHandler"
      v-on:strokeChange="strokeChangeHandler"
      v-on:rotate="rotateHandler"
      v-show="isActive"
    ></sprite-option>
  </div>
</template>

<script>
import SpriteOption from "./SpriteOption.vue"

let Sprite = {
  components: {
    "sprite-option": SpriteOption
  },
  props: ["width", "height", "x", "y", "isActive", "name", "contentWidth", "contentHeight"],
  data: function() {
    return {
      fillColor: "yellow",
      isFill: true,
      isStroke: true,
      borderWidth: 0,
      rotateAngle: 0
    }
  },
  computed: {

  },
  methods: {
    contentMousedownHandler: function(e) {
      this.$emit("spriteContentMousedown", e, this.borderWidth)
    },
    dragableMousedownHandler: function(e) {
      this.$emit("spriteContentMousedown", e)
    },
    fillChangeHandler: function(isFill) {
      this.isFill = isFill
    },
    rotateHandler: function(angle) {
      angle = parseInt(angle)
      this.rotateAngle = angle
      this.$emit("spriteRotate", angle)
    },
    strokeChangeHandler: function(isStroke) {

    }
  }
}
export default Sprite
</script>

<style lang="css">
.sprite {
  position: absolute;
  z-index: 5;
  border: 1px solid lightblue;
}
.sprite-content {
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: rgba(248, 248, 77, 0.5);
  font-size: 14px;
  box-sizing: border-box;
  z-index: 10;
  overflow: hidden;
}
/*.sprite.active .sprite-content {
  border: 10px solid lightblue;
}*/
.sprite-content.unfill {
  background-color: transparent !important;
}
/*.drag-bar {

}*/
.dragable-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
}
.dragable {
  display: none;
}
.sprite.active .dragable {
  display: block;
}
/*.dragable.rotate {
  width: 20px;
  height: 20px;
  background-color: lightblue;
  position: absolute;
  border-radius: 50%;
  left: 50%;
  margin-left: -10px;
  bottom: -40px;
}*/
.drag-dot {
  width: 10px;
  height: 10px;
  background-color: lightblue;
  position: absolute;
  border-radius: 50%;
}
.drag-dot.left-top {
  left: -5px;
  top: -5px;
}
.drag-dot.left-bottom {
  left: -5px;
  bottom: -5px;
}
.drag-dot.right-top {
  right: -5px;
  top: -5px;
}
.drag-dot.right-bottom {
  right: -5px;
  bottom: -5px;
}

</style>
