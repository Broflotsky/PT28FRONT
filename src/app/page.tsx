import ProductCard from "@/components/ProductCard";
import { getAllProductsService } from "@/services/products.services";

const Home = async () => {
  const allProducts = await getAllProductsService();

  return (
    <div>
      <section className="w-screen flex flex-wrap gap-5">
        {allProducts &&
          allProducts.map((product) => {
            return <ProductCard product={product} key={product.name} />;
          })}
      </section>
    </div>
  );
};

export default Home;
