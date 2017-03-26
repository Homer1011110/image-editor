<template lang="html">
  <div class="sprite"
    v-bind:style="{left: x+'px', top: y+'px', width: width+'px', height: height+'px'}"
    v-bind:class="{active: isActive}"
  ></div>
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
</style>
