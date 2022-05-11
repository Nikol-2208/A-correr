export interface InvoiceShowInterface {
  id: string;
}

export interface InvoiceParamsInterface {
  date: string;
  dueDate: string;
  client: string;
  seller: string;
  items: Record<string, unknown>[];
}

export interface SellerPointInterface {
  id: string;
  name: string;
  points: number;
}

type imageObjectType = {
  full: string;
  raw: string;
  regular: string;
  small: string;
  thumb: string;
};

export interface SellerShowInterface {
  id: string;
  name: string;
  image: imageObjectType;
  observations: string;
  status: string;
}

export interface ClientInterface {
  id: string;
  name: string;
}

export interface ProductInterface {
  id: string;
  name: string;
  price: { price: number }[];
}

export type State = {
  sellersPoints: SellerPointInterface[];
  pointsReward: number;
  winnerPoints: number;
  // sellerWinner(): SellerPointInterface;
};
