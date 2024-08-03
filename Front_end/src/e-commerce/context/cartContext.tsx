import { ReactNode, useState, createContext, useContext } from "react";

// Interface for the product type
interface Product {
  id: string; // Unique identifier for the product
  img: string; // Image URL of the product
  name: string; // Name of the product
  price: string; // Price of the product
}

// Interface for the cart context
interface ICartContext {
  product: Product[]; // List of products in the cart
  addToCart: (product: Product) => void; // Function to add a product to the cart
  removeFromCart: (id: string) => void; // Function to remove a product by ID
}

// Create a context with default values
const CartContext = createContext<ICartContext>({
  product: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

// Interface for the context provider props
interface ICartContextProvider {
  children: ReactNode; // Children components that will have access to the cart context
}

// Cart context provider component
export const CartContextProvider: React.FC<ICartContextProvider> = ({
  children
}) => {
  const [product, setProduct] = useState<Product[]>([]);

  // Function to add a product to the cart
  const addToCart = (productToAdd: Product) => {
    setProduct((prevProducts) => [...prevProducts, productToAdd]);
  };

  // Function to remove a product from the cart by ID
  const removeFromCart = (id: string) => {
    setProduct((prevProducts) => prevProducts.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ product, addToCart, removeFromCart }}>
      {children} {/* Render children components */}
    </CartContext.Provider>
  );
};

// Hook to use the cart context
export const useCartContext = (): ICartContext => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }

  return context; // Return the context value
};
