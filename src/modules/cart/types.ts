export interface CartItem {
  menuItemId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  observation?: string;
}
