import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import productsData from "../Data/Data.json";

function ProductList() {
  const [cart, setCart] = useState(() => {
    const savedItems = localStorage.getItem("cart");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [products, setProducts] = useState(productsData);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/Data/Data.json");
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (product) => {
    const itemExists = cart.find((item) => item.id === product.id);
    if (itemExists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3  md:grid-cols-2 gap-10 p-5 border-8 border-black rounded-lg">
        <div className="grid col-span-2 sm:w-full lg:grid-cols-3 md:grid-cols-2 md:w-full gap-10 bg-white border rounded-md p-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white border rounded-md p-5"
            >
              <img
                src={product.image.desktop}
                alt={product.name}
                className="product-image rounded-md shadow-md shadow-black hover:border-2 hover:border-orange-600 "
              />
              <figcaption>
                <h2 className="font-bold text-lg">{product.name}</h2>
                <p className="text-orange-700 font-semibold">
                  ${product.price}
                </p>

                <button
                  onClick={() => {
                    addItem(product);
                    console.log(`${product.name} added to cart!`);
                  }}
                  className=" text-black w-32 p-2 border-1 border-black rounded-full hover:bg-orange-700 focus:ring-4 focus:ring-orange-500"
                >
                  Add to Cart
                </button>
              </figcaption>
            </div>
          ))}
        </div>

        <div className="col-span-1">
          <Cart cart={cart} setCart={setCart} />
        </div>
      </div>
    </>
  );
}

export default ProductList;
