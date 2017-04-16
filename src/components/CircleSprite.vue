<script>
import Sprite from "./Sprite.vue"
let CircleSprite = {
  extends: Sprite,
  computed: {
    text: function() {
      return "circle"
    }
  }
}
export default CircleSprite
</script>

<style lang="css" scoped>
.sprite {
  position: absolute;
  background-color: rgba(248, 248, 77, 0.5);
  border-radius: 50%;
}
.sprite.active {
  border: 1px dotted black;
}

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
