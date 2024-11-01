import React from 'react'
import RegisterHeader from '../../components/RegisterHeader';
import Footer from '../../components/Footer';

interface Props {
  children ?: React.ReactNode
}

const RegisterLayout = ({children}: Props) => {
  return (
    <>
      <RegisterHeader></RegisterHeader>
      {children}
      <Footer></Footer>
    </>
  )
};

export default RegisterLayout;
