<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-7 py-5">
        <div class="invoice">
          <h4>Factura</h4>
          <div class="row">
            <div class="col-md-6">
              <div class="client">
                <h4>Cliente</h4>
                <div class="content d-flex" v-if="invoice.client"><span>Nombre:&nbsp;</span><span>{{invoice.client.name}}</span></div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="seller">
                <h4>Vendedor: </h4>
                <div class="content d-flex" v-if="invoice.seller"><span>Nombre:&nbsp;</span><span>{{invoice.seller.name}}</span></div>
              </div>
            </div>
            <div class="col-md-12">
              <InvoiceItem v-for="(item,id) in invoice.items"
                :key="id"
                :item="item"
              ></InvoiceItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { axiosAlegra } from "@/vue-http";
import { InvoiceShowInterface } from "@/types";
import InvoiceItem from "@/components/InvoiceItem.vue";
import { Mutation } from "vuex-class";
@Component({
  components: {
    InvoiceItem,
  },
})
export default class InvoiceShow extends Vue {
  @Prop() id: string;
  @Mutation clearSellersPoints: () => void;
  loading = true;
  invoice: InvoiceShowInterface = { id: ""};

  mounted(): void {
    this.fetchInvoice();
    this.clearSellersPoints();
  }

  fetchInvoice(): void {
    const url = `/invoices/${this.id}`;
    axiosAlegra
      .get(url)
      .then(({ data }) => {
        this.invoice = data;
      })
      .finally(() => (this.loading = false));
  }
}
</script>
<style lang="scss">
.invoice {
  border: 1px solid deepskyblue;
  border-radius: 4px;
  .invoice-item {
    background: deepskyblue;
    padding: 12px 10px;
  }
  %entity-column {
    padding: 10px;
  }
  .client {
    @extend %entity-column;
  }
  .seller {
    @extend %entity-column;
    border-right: 1px solid #dcdfea;
  }
}
</style>
