import React, { createContext, useState, ReactNode, useContext } from "react";
import { CartItem } from "../types/cartItem.type";

interface CartContextProps {
    cartItems: CartItem[]
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

interface CartProviderProps {
    children: ReactNode
}

export const CartContext = createContext<CartContextProps| undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context) {
        throw new Error("useCart must be used within a CartProvider")
    };
    return context
}

