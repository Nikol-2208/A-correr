<template>
  <div class="d-flex justify-content-between invoice-item">
    <div class="name"><b>Nombre</b>
      <div class="label">{{item.name}}</div>
    </div>
    <div class="price"><b>Price</b>
      <div class="label">{{item.price}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProductInterface } from "@/types";

@Component
export default class InvoiceItem extends Vue {
  @Prop() item: ProductInterface;
}
</script>
