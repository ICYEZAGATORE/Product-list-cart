import React, { useState } from "react";

function Cart({ cart, setCart }) {
  const [showPopup, setShowPopup] = useState(false);

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const placeOrder = () => {
    setShowPopup(true);
  };

  const resetCart = () => {
    setCart([]);
    setShowPopup(false);
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        return total + Number(item.price) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="p-4 border rounded-md bg-white">
      <h2 className="text-xl font-bold mb-4 text-orange-700">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="p-5 grid grid-cols-3 ">
              <div className="col-span-2">
                <h3 className="font-semibold">{item.name}</h3>
                <p>Price: ${Number(item.price).toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${(Number(item.price) * item.quantity).toFixed(2)}</p>
              </div>
              <div className="space-x-3 col-span-1 flex items-center justify-end">
                <button
                  onClick={() => increaseQty(item.id)}
                  className="bg-green-600 text-white px-3 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="bg-yellow-600 text-white px-3 rounded"
                >
                  -
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className=" px-3 rounded"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 text-right">
            <p className="font-bold">Total: ${calculateTotal()}</p>
            <div className="mt-2 space-x-3">
              <button
                onClick={placeOrder}
                className="bg-orange-700 text-white px-4 py-2 rounded-full"
              >
                Place Order
              </button>
              <button
                onClick={resetCart}
                className="bg-gray-500 text-white px-4 py-2 rounded-full"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">✅ Order Confirmed!</h2>
            <p className="mb-4">Thank you for your purchase.</p>
            <button
              onClick={resetCart}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
