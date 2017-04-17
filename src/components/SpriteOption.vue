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
      isStroke: true
    }
  },
  methods: {
    fillChangeHandler: function(isChecked) {
      this.$emit("fillChange", isChecked)
    },
    strokeChangeHandler: function(isChecked) {
      this.$emit("strokeChange", isChecked)
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
  width: 200px;
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
