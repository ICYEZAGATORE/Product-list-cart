import "./App.css";
import ProductList from "./components/ProductList";

function App() {
  return (
    <>
      <h1 className="text-4xl text-white font-bold p-3">Product List</h1>

      <div>
        <ProductList />
        <p className="footer mt-4 flex text-center text-white">
          © 2025 E-commerce Store
        </p>
      </div>
    </>
  );
}

export default App;
