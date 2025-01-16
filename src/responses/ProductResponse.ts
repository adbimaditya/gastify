import MyResponse from './MyResponse';

type ProductResponse = MyResponse<ProductData>;

type ProductData = {
  registrationId: string;
  storeName: string;
  productId: string;
  productName: string;
  stockAvailable: number;
  stockRedeem: number;
  sold: number;
  modal: number;
  price: number;
  productMinPrice: number;
  productMaxPrice: number;
  image: string;
  stockDate: string;
  lastStock: number;
  lastStockDate: string;
  lastSyncAt: string;
};

export default ProductResponse;
