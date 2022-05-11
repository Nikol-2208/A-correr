import Vue from "vue";
import Vuex, { ActionContext, MutationTree, GetterTree } from "vuex";
import { isEmpty } from "lodash";
import { State, SellerPointInterface } from "@/types";

Vue.use(Vuex);

export const state = {
  sellersPoints: [],
  pointsReward: 3,
  winnerPoints: 20,
};

export const getters = <GetterTree<State, State>>{
  sellerWinner: (state: State): SellerPointInterface | undefined => {
    return state.sellersPoints.find(
      (seller) => seller.points >= state.winnerPoints
    );
  },
  raceHasEnded: (state, getters): boolean => {
    return !isEmpty(getters.sellerWinner);
  },
  totalPoints: (state: State): number => {
    let total = 0;
    state.sellersPoints.forEach((seller) => {
      total += seller.points;
    });
    return total;
  },
};

export const mutations = <MutationTree<State>>{
  assignPoints(state: State, payload: { seller: SellerPointInterface }): void {
    const seller = state.sellersPoints.find(
      (seller) => seller.id === payload.seller.id
    );
    if (seller) {
      seller.points += state.pointsReward;
      return;
    }

    state.sellersPoints.push(payload.seller);
  },
  clearSellersPoints(state: State): void {
    state.sellersPoints = [];
  },
};

export const actions = {
  addSellerPoints(
    { commit }: ActionContext<State, State>,
    payload: SellerPointInterface
  ): void {
    commit("assignPoints", payload);
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
