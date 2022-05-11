<template>
  <div class="container">
    <form @submit.prevent="searchImages">
      <div class="row justify-content-md-center mt-5" data-aos="fade-in-top">
        <div class="col-md-6">
          <div class="form-group">
            <input
              class="form-control"
              type="text"
              v-model="query"
              @key.enter="searchImages"
              required="required"
              placeholder="Buscar imágenes"
            />
          </div>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary" type="submit">Buscar</button>
        </div>
      </div>
    </form>
    <div class="row justify-content-md-center mt-3">
      <div class="col-md-6">
        <SellerProgressBar
          class="border-2 border-top border-primary"
          v-for="sellerCompetitor in sellersPoints"
          :sellerName="sellerCompetitor.name"
          :sellerPoints="sellerCompetitor.points"
          :key="sellerCompetitor.id"
        ></SellerProgressBar>
        <div
          class="d-flex justify-content-between border-2 border-bottom border-primary"
          v-if="totalPoints"
        >
          <div class="total-label">
            <h4>Puntos Totales</h4>
          </div>
          <div class="total">
            <h4>{{ totalPoints }}</h4>
          </div>
        </div>
      </div>
    </div>
    <transition-group class="row" tag="div" name="list">
      <SellerImage
        class="col-md-4 col-sm-6"
        v-for="seller in sellers"
        :seller="seller"
        :key="seller.id"
        data-aos="fade-in"
      ></SellerImage>
    </transition-group>
    <EmptyMessage v-if="noImages"></EmptyMessage>
    <Modal v-if="showWinner" @close="closeModal">
      <div class="content" slot="content">
        <h6 v-if="sellerWinner">
          ¡Felicidades {{ sellerWinner.name }} ganaste!
        </h6>
        <router-link :to="{ name: 'Invoice', params: { id: invoiceId } }"
          >Ver Factura</router-link
        >
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import SellerImage from "@/components/SellerImage.vue";
import SellerProgressBar from "@/components/SellerProgressBar.vue";
import { axiosUnplash, axiosAlegra } from "@/vue-http";
import { State, Getter, Mutation } from "vuex-class";
import EmptyMessage from "@/components/ClientMessage.vue";
import Modal from "@/components/Modal.vue";
import {
  InvoiceParamsInterface,
  SellerPointInterface,
  ClientInterface,
  ProductInterface,
} from "@/types";
import { AxiosResponse } from "axios";
import { format } from "date-fns";

@Component({
  components: {
    SellerImage,
    SellerProgressBar,
    EmptyMessage,
    Modal,
  },
})
export default class Home extends Vue {
  @State sellersPoints!: SellerPointInterface[];
  @Getter raceHasEnded!: boolean;
  @Getter totalPoints!: number;
  @Getter sellerWinner!: SellerPointInterface;
  @Mutation clearSellersPoints: () => void;
  query = "";

  images = [];

  sellers = [];

  client: ClientInterface = { id: "", name: "" };

  product: ProductInterface = {
    id: "",
    name: "",
    price: [{ price: 0 }],
  };

  loading = false;

  loadingCreation = false;

  showWinner = false;

  invoiceId = 1;

  get dateNow(): string {
    return format(new Date(), "yyyy-MM-dd");
  }

  get dueDate(): string {
    return format(new Date(2021, 10, 6), "yyyy-MM-dd");
  }

  get invoiceParams(): InvoiceParamsInterface {
    return {
      date: this.dateNow,
      dueDate: this.dueDate,
      client: this.client?.id,
      seller: this.sellerWinner.id,
      items: [
        {
          id: this.product?.id,
          price: this.product?.price[0].price,
        },
      ],
    };
  }

  get noImages(): boolean {
    return this.images.length === 0;
  }

  searchImages(): void {
    this.images = [];
    this.loading = true;
    axiosUnplash
      .get("/search/photos", {
        params: { query: this.query, per_page: 100 },
      })
      .then((response: AxiosResponse) => {
        this.images = response.data.results.map(
          (item: Record<string, number>) => item.urls
        );
        this.fetchSellers().then(() => this.assingImageToSeller());
      })
      .finally(() => (this.loading = false));
  }

  async fetchSellers(): Promise<void> {
    const { data } = await axiosAlegra.get("/sellers");
    this.sellers = data;
  }

  fetchClient(): Promise<void> {
    return axiosAlegra.get("/contacts").then(({ data }) => {
      this.client = data[0];
    });
  }

  fetchProduct(): Promise<void> {
    return axiosAlegra.get("/items").then(({ data }) => {
      this.product = data[0];
    });
  }

  assingImageToSeller(): void {
    this.sellers.forEach((seller: Record<string, unknown>, index: number) => {
      let image = this.images[index];
      this.$set(seller, "image", image);
    });
  }

  createInvoice(): void {
    this.loadingCreation = true;
    axiosAlegra
      .post("/invoices", this.invoiceParams)
      .then(({ data }: AxiosResponse) => {
        this.invoiceId = data.id;
      })
      .catch(({ message }) => {
        console.error(message);
      })
      .finally(() => {
        this.loadingCreation = false;
      });
  }

  async dispatchAlegraInvoice(): Promise<void> {
    await this.fetchClient();
    await this.fetchProduct();
    this.showWinner = true;
  }

  @Watch("raceHasEnded", { immediate: true })
  onRaceEnded(val: boolean): void {
    if (val) {
      this.dispatchAlegraInvoice().then(() => this.createInvoice());
    }
  }

  closeModal(): void {
    this.showWinner = false;
    this.clearSellersPoints();
  }
}
</script>
