<script>
import Sprite from "./Sprite.vue"
let CircleSprite = {
  extends: Sprite
}
export default CircleSprite
</script>

<style lang="css" scoped>
.sprite {
  position: absolute;
}
.sprite-content {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(248, 248, 77, 0.5);
  font-size: 14px;
  box-sizing: border-box;
}
.sprite.active .sprite-content {
  border: 2px solid lightblue;
}
.sprite-content.unfill {
  background-color: transparent !important;
}
/*
  dragable
*/
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
