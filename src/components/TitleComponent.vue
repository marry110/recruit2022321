<template>
  <div>
    <div class="title-box">
      <div class="left">
        <img src="../assets/logo.png" alt="" />
      </div>
      <div class="right">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.title-box {
  padding: 0 20px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #999;
  .left {
    display: flex;
    align-items: center;
    img {
      height: 70px;
    }
  }
}
</style>
