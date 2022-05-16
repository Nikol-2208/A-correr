<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="image-card">
      <div class="img-holder"><img :src="seller.image.regular" /></div>
      <div class="image-card-footer mb-2">
        <div class="image-card-seller mt-2">{{seller.name}}</div><button class="btn btn-sm btn-primary" @click="addPoints()">Me gusta</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";
import { SellerPointInterface, SellerShowInterface } from "@/types";

@Component
export default class SellerImage extends Vue {
  @State pointsReward: number;
  @Action("addSellerPoints") addSellerPointAction: (data: {
    seller: SellerPointInterface;
  }) => void;
  @Getter raceHasEnded: boolean;
  @Prop() seller: SellerShowInterface;

  liked = false;

  get imageURL(): string {
    if (this.seller.image) {
      return this.seller.image.regular;
    }
    return "";
  }

  get allowLike(): boolean {
    return !(this.liked || this.raceHasEnded);
  }

  addPoints(): void {
    this.liked = true;
    this.addSellerPointAction({
      seller: {
        points: this.pointsReward,
        name: this.seller.name,
        id: this.seller.id,
      },
    });
  }
}
</script>
<style lang="scss">
.image-card {
  margin-bottom: 10px;
  img {
    border-radius: 5px;
    width: 40%;
  }
  .img-holder {
    background-size: contain;
    height: 100px;
    overflow: hidden;
  }
}
</style>
