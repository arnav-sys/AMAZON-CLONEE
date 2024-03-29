import { getSession } from "next-auth/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { addProducts } from "../slices/basketSlice";

export default function Home({ products }) {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    dispatch(addProducts(products));
  }, [products]);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
      </Head>

      <Header
        products={products}
        setShowCart={setShowCart}
        showCart={showCart}
      />

      <main className="mx-auto" style={{ maxWidth: "1920px" }}>
        {/* Banner */}
        <Banner />
        {/* Product feed */}
        <ProductFeed products={products} setShowCart={setShowCart} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const products = await fetch("https://fakestoreapi.com/products").then(
    (response) => response.json()
  );

  return {
    props: {
      products,
      session,
    },
  };
}
