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
</style>
