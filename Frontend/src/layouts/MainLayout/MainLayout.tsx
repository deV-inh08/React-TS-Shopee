import React from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Props {
    children ?: React.ReactNode
}

const MainLayout = ({children}: Props) => {
  return (
    <div>
        <Header></Header>
        {children}
        <Footer></Footer>
    </div>
  )
};

export default MainLayout
