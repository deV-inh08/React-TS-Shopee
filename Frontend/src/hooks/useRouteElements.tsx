import {Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from '../pages/ProductList'
import Login from '../pages/Login'
import Register from '../pages/Register'
import RegisterLayout from '../layouts/RegisterLayout/RegisterLayout'
import MainLayout from '../layouts/MainLayout'
// import PageNotFound from '../pages/PageNotFound'
import Profile from '../pages/User/pages/Profile'
import { useContext } from 'react'
import { AppContext } from '../contexts/app.context'
import path from '../constants/path'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../components/Cart'
import CartLayout from '../layouts/CartLayout'
import UserLayout from '../pages/User/layouts/UserLayout'
import ChangePassword from '../pages/User/pages/ChangePassword'
import PageNotFound from '../pages/PageNotFound'



function ProtectedRoute() {
    const {isAuthenticated} = useContext(AppContext)
    return isAuthenticated ? <Outlet/> : <Navigate to="/login"/> 
};

function RejectRouted() {
    const {isAuthenticated} = useContext(AppContext)
    return !isAuthenticated ? <Outlet/> : <Navigate to='/'/>
};

export const useRouteElements = () => {
    const routeElements = useRoutes([
        {
            path: '/',
            index: true, 
            element: (
                <MainLayout>
                    <ProductList/>
                </MainLayout>
            )
        }, 
        
        {
            path: "",
            element: <ProtectedRoute></ProtectedRoute>,
            children: [
                {
                    path: path.cart,
                    element: (
                        <CartLayout>
                            <Cart/>
                        </CartLayout>
                    )
                }, 
                {
                    path: path.user,
                    element: (
                        <MainLayout>
                             <UserLayout></UserLayout>
                        </MainLayout>
                    ),
                    children: [
                        {
                            path: path.profile,
                            element: <Profile></Profile>
                        },
                        {
                            path: path.changePassword,
                            element: <ChangePassword></ChangePassword>
                        }
                    ]
                },
                {
                    path: path.productDetail,
                    index: true,
                    element: (
                        <MainLayout>
                            <ProductDetail></ProductDetail>
                        </MainLayout>
                    )
                },
            ]
        },

        {
            path: "",
            element: <RejectRouted></RejectRouted>,
            children: [
                {
                    path: path.login,
                    element: <RegisterLayout><Login/></RegisterLayout>
                },
                {
                    path: path.register,
                    element: <RegisterLayout><Register/></RegisterLayout>
                },  
            ]
        },
        {
            path: "*",
            element: ( 
                <MainLayout>
                    <PageNotFound/>
                </MainLayout> 
            )
        }  
         
    ])
    return routeElements
}
