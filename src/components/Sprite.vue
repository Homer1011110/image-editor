<template lang="html">
  <div class="sprite"
    v-bind:style="{left: x+'px', top: y+'px', width: width+'px', height: height+'px'}"
    v-bind:class="{active: isActive}"
  >
    <div class="sprite-content"
      v-bind:class="{unfill: !isFill}"
      v-on:mousedown.top="contentMousedownHandler"
    >
      <div class="dragable drag-bar top"></div>
      <div class="dragable drag-bar bottom"></div>
      <div class="dragable drag-bar left"></div>
      <div class="dragable drag-bar right"></div>
      <div class="dragable drag-dot left-top"></div>
      <div class="dragable drag-dot right-top"></div>
      <div class="dragable drag-dot right-bottom"></div>
      <div class="dragable drag-dot left-bottom"></div>
    </div>
    <sprite-option
      v-on:fillChange="fillChangeHandler"
      v-on:strokeChange="strokeChangeHandler"
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
  props: ["width", "height", "x", "y", "isActive"],
  data: function() {
    return {
      fillColor: "yello",
      isFill: true,
      isStroke: true
    }
  },
  // computed: {
  //
  // }
  methods: {
    contentMousedownHandler: function(e) {
      this.$emit("spriteContentMousedown", e)
    },
    fillChangeHandler: function(isFill) {
      this.isFill = isFill
    },
    strokeChangeHandler: function(isStroke) {

    }
  }
}
export default Sprite
</script>

<style lang="css" scoped>
.sprite {
  position: absolute;
}
.sprite-content {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(248, 248, 77, 0.5);
  font-size: 14px;
  box-sizing: border-box;
}
.sprite.active .sprite-content {
  border: 2px solid lightblue;
}
.sprite-content.unfill {
  background-color: transparent !important;
}
/*.drag-bar {

}*/
.dragable {
  display: none;
}
.sprite.active .dragable {
  display: block;
}
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
