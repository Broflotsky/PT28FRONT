import { Product } from "@/interfaces/product.interface";
import Image from "next/image";

interface CardProps {
  product: Product;
}

const ProductCard = ({ product }: CardProps) => {
  return (
    <div key={product.id} className="w-[360px] h-[600px]">
      {/* <Image
        src={product.image}
        alt={`Image product ${product.name}`}
        width={360}
        height={300}
      /> */}
      <img src={product.image} alt={`Image product ${product.name}`} />
      <p className="text-blue-700 text-3xl">{product.name}</p>
      <p className="text-sm">{product.description}</p>
      <p className="text-blue-700 text-3xl">${product.price}</p>
    </div>
  );
};

export default ProductCard;
