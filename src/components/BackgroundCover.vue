<template lang="html">
  <div class="background-cover" :class="{hide: !isShow}"></div>
</template>

<script>
import eventBus from "../base/eventBus"

export default {
  data: function() {
    return {
      isShow: false
    }
  },
  created: function() {
    eventBus.$on("spriteselected", (sprte)=> {
      this.isShow = true
    })
    eventBus.$on("spritecreate", ()=> {
      this.isShow = false
    })
  }
}
</script>

<style lang="css" scoped>
  .background-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: block;
  }
  .background-cover.hide {
    display: none;
  }
</style>
