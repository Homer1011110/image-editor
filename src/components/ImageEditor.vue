<template lang="html">
  <section class="canvas-section">
    <div class="bg-canvas-wrapper">
      <canvas id="test" class="bg-canvas"
        v-show="isImgLoaded"
        v-bind:width="bgCanvasWidth" v-bind:height="bgCanvasHeight"
        ref="bgCanvas"
      ></canvas>
      <div class="drag-layer"
        v-show="isCreatingSprite"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  data: function() {
    return {
      isCreatingSprite: false,
      sampleImgUrl: "http://localhost:8089/imgs/bg-3.jpg",
      isImgLoaded: false,
      bgCanvasWidth: 300,
      bgCanvasHeight: 300
    }
  },
  created: function() {
    // let self = this
    // let sampleImg = new Image()
    // sampleImg.src = this.sampleImgUrl
    // sampleImg.onload = function() {
    //   self.isImgLoaded = true
    //   self.bgCanvasWidth = this.width
    //   self.bgCanvasHeight = this.height
    // }
    console.log("created: ", document.querySelector("#test"))
  },
  mounted: function() {
    let self = this
    let sampleImg = new Image()
    sampleImg.src = this.sampleImgUrl
    sampleImg.onload = function() {
      self.isImgLoaded = true
      self.bgCanvasWidth = this.width
      self.bgCanvasHeight = this.height
    }
    setTimeout(function() {
      console.log(self.$refs.bgCanvas)
    }, 5000)
    console.log("mounted: ", self.$refs.bgCanvas)
  },
  methods: {
    drawBackground: function(img) {
      console.log(this.$refs, this.$refs["bgCanvas"])
      console.log(this.$refs.bgCanvas)
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
}
.bg-canvas {
  max-width: 800px;
  min-width: 500px;
  margin: 0 auto;
  border: 1px solid black;
}
.bg-canvas-wrapper > .sprite {
  position: absolute;
  background-color: rgba(248, 248, 77, 0.5);
}
.drag-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: none;
  z-index: 1
}
</style>
