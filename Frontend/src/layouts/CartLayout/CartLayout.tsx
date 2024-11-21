import React from 'react'
import CartHeader from '../../components/CartHeader';
import Footer from '../../components/Footer';

interface Props {
    children?: React.ReactNode;
}

const CartLayout = ({ children }: Props) => {
  return (
    <div>
        <CartHeader></CartHeader>
        { children }
        <Footer></Footer>
    </div>
  )
};

export default CartLayout;
