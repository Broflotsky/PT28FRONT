import { Product } from "@/interfaces/product.interface";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllProductsService = async () => {
  try {
    const res = await fetch(`${APIURL}/products`, {
      method: "GET",
    });
    const products: Product[] = await res.json();
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getProductByIdService = async (id: string) => {
  try {
    const allProducts = await getAllProductsService();
    const product = allProducts.find((product) => product.id === Number(id));
    if (!product) {
      throw new Error("No se encontro un producto con ese ID");
    }
    return product;
  } catch (error: any) {
    throw new Error(error);
  }
};
