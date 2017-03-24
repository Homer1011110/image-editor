<template lang="html">
  <div class="sprite"
    v-bind:style="{left: left+'px', top: top+'px', width: width+'px', height: height+'px'}"
  ></div>
</template>

<script>
import Vue from "vue"
let Sprite = {
  props: ["offsetX", "offsetY", "startX", "startY"],
  data: function() {
    return {}
  },
  computed: {
    left: function() {
      return this.offsetX < this.startX ? this.offsetX : this.startX
    },
    top: function() {
      return this.offsetY < this.startY ? this.offsetY : this.startY
    },
    width: function() {
      return Math.abs(this.offsetX - this.startX)
    },
    height: function() {
      return Math.abs(this.offsetY - this.startY)
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
</style>
