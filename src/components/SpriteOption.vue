<template lang="html">
  <div class="sprite-option">
    <div class="option">
      <label>填充</label>
      <checkbox
        initChecked="true"
        v-on:checkedChange="fillChangeHandler"
      ></checkbox>
    </div>
    <div class="option">
      <label>描边</label>
      <checkbox
        initChecked="true"
        v-on:checkedChange="strokeChangeHandler"
      ></checkbox>
    </div>
    <div class="option">
      <label>旋转角度</label>
      <input
        type="number"
        max="360"
        min="0"
        v-model="angle"
        v-on:input="rotateHandler"
      >
    </div>
  </div>
</template>

<script>
import CheckBox from "./CheckBox.vue"

let SpriteOption = {
  components: {
    "checkbox": CheckBox
  },
  data: function() {
    return {
      isFill: true,
      isStroke: true,
      angle: 0
    }
  },
  methods: {
    fillChangeHandler: function(isChecked) {
      this.$emit("fillChange", isChecked)
    },
    strokeChangeHandler: function(isChecked) {
      this.$emit("strokeChange", isChecked)
    },
    rotateHandler: function(e) {
      this.$emit("rotate", this.angle)
    }
  }
}
export default SpriteOption
</script>

<style lang="css" scoped>
.sprite-option {
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  line-height: 30px;
  background-color: white;
  border: 1px solid #222;
  border-radius: 4px;
  font-size: 14px;
}
.option {
  display: inline;
}
.option label {
  vertical-align: middle;
}
</style>
