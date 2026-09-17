import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("eden-cart") || "[]");
    } catch {
      return [];
    }
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("eden-cart", JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const add = (puppy) => {
      if (!puppy.canPurchase || puppy.status === "sold") {
        setMessage("sold");
        return false;
      }
      if (items.some((item) => item.id === puppy.id)) {
        setMessage("already");
        return false;
      }
      setItems((prev) => [
        ...prev,
        {
          id: puppy.id,
          name: puppy.name,
          breed: puppy.breed,
          sex: puppy.sex,
          price: puppy.price,
          photo: puppy.photos?.[0],
          status: puppy.status
        }
      ]);
      setMessage("added");
      return true;
    };
    const remove = (id) => setItems((prev) => prev.filter((item) => item.id !== id));
    const clear = () => setItems([]);
    const total = items.reduce((sum, item) => sum + Number(item.price), 0);
    return { items, add, remove, clear, total, message, setMessage };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
