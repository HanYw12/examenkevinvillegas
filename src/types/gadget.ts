export interface Gadget {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  purchaseYear: number;
}

export type NewGadget = Omit<Gadget, "id">;