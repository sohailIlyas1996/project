export interface Product {
    productId: string;
    imageUrl: string;
    title: string;
    description: string;
    qrCode?: string;
}

export interface CartProduct {
    productId: string;
    title: string;
    description: string;
    imageUrl: string;
}
  