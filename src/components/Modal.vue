<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <slot name="content"></slot>
          <div class="close-button mt-4"><button class="btn btn-outline-dark btn-sm" @click="close">Cerrar</button></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
  close(): void {
    this.$emit("close");
  }
}
</script>

<style lang="scss">
.modal-mask {
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  transition: opacity 0.3s ease;
  width: 100%;
  z-index: 9998;
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    .modal-container {
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      font-family: Helvetica, Arial, sans-serif;
      margin: auto;
      padding: 20px 30px;
      transition: all 0.3s ease;
      width: 300px;
      .content {
        text-align: center;
        img {
          width: 100%;
        }
        .trophy-img {
          max-width: 180px;
        }
      }
    }
    .close-button {
      text-align: center;
    }
  }
}
</style>
