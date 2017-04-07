<template lang="html">
  <div class="sprite"
    v-bind:style="{left: x+'px', top: y+'px', width: width+'px', height: height+'px'}"
    v-bind:class="{active: isActive}"
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
</template>

<script>
let Sprite = {
  props: ["width", "height", "x", "y", "isActive"],
  data: function() {
    return {}
  },
  computed: {
    left: function() {
      return this.offsetX < this.startX ? this.offsetX : this.startX
    },
    top: function() {
      return this.offsetY < this.startY ? this.offsetY : this.startY
    }
  }
}
export default Sprite
</script>

<style lang="css" scoped>
.sprite {
  position: absolute;
  background-color: rgba(248, 248, 77, 0.5);
  font-size: 14px;
}
.sprite.active {
  border: 1px dotted black;
}
/*.drag-bar {

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
