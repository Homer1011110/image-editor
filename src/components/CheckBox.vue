<template lang="html">
  <div class="checkbox" v-on:click="onclick">
    <img src="../imgs/checkbox-checked.png" class="pic"
      v-show="checked"
    >
    <img src="../imgs/checkbox.png" class="pic"
      v-show="!checked"
    >
  </div>
</template>

<script>
let CheckBox = {
  props: ["initChecked"],
  data: function() {
    return {checked: this.initChecked}
  },
  methods: {
    onclick: function() {
      this.checked = !this.checked
      this.$emit("checkedChange", this.checked)
    }
  }
}
export default CheckBox
</script>

<style lang="css" scoped>
.checkbox {
  display: inline-block;
}
.pic{
  width: 30px;
  vertical-align: middle;
}
</style>
