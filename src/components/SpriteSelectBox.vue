<template lang="html">
  <div class="sprite-select-box">
    <button class="sprite-selector" v-on:click.prevent="selectSprite('rect-sprite')">矩形</button>
    <button class="sprite-selector" v-on:click.prevent="selectSprite('circle-sprite')">圆形</button>
  </div>
</template>

<script>
import eventBus from "../base/eventBus"

let SpriteSelectBox = {
  data: function() {
    return {}
  },
  methods: {
    selectSprite: function(sprite) {
      this.$store.commit("spriteSelected", {sprite})
    }
  }
}
export default SpriteSelectBox
</script>

<style lang="css" scoped>
.sprite-select-box {
  position: relative;
  z-index: 5;
}
</style>
