<template>
  <div class="seller-progress-bar mt-4  ">
    <div class="d-flex justify-content-between">
      <div class="seller-progress-name"> <b>{{sellerName}}</b></div>
      <div class="seller-progress-points-win">Puntos Faltantes {{pointsToWin}}</div>
    </div>
    <div class="seller-progress-winner" v-if="isWinner">¡Felicidades!</div>
    <div class="progress">
      <div class="progress-bar progress-bar-striped" role="progressbar" :style="stylePercent" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{sellerPoints}} Puntos</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
export default class SellerProgress extends Vue {
  @Prop() sellerPoints: number;
  @Prop() sellerName: string;
  @State winnerPoints: number;

  get barPercent(): number {
    return (this.sellerPoints / this.winnerPoints) * 100;
  }

  get stylePercent(): string {
    return `width: ${this.barPercent}%`;
  }

  get isWinner(): boolean {
    return this.barPercent >= 100;
  }

  get pointsToWin(): number {
    return this.winnerPoints - this.sellerPoints;
  }
}
</script>
<style lang="scss">
.seller-progress-bar {
  .seller-progress-winner {
    color: cyan;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
