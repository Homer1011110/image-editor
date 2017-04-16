<template lang="html">
  <div class="sprite-option">
    <div class="option">
      <label>填充</label>
      <checkbox initChecked="true"></checkbox>
    </div>
    <div class="option">
      <label>描边</label>
      <checkbox initChecked="true"></checkbox>
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
    onCheck: function(e) {
      console.log("checkbox:", e)
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
</style>
