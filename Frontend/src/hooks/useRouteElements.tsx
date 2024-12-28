import { lazy, Suspense } from 'react'
import {Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from '../layouts/RegisterLayout/RegisterLayout'
import MainLayout from '../layouts/MainLayout'
import { useContext } from 'react'
import { AppContext } from '../contexts/app.context'
import path from '../constants/path'
import CartLayout from '../layouts/CartLayout'
import UserLayout from '../pages/User/layouts/UserLayout'


const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const Profile = lazy(() => import('../pages/User/pages/Profile'))
const ProductDetail = lazy(() => import('../pages/ProductDetail'))
const Cart = lazy(() => import('../components/Cart'))
const ChangePassword = lazy(() => import('../pages/User/pages/ChangePassword'))
const ProductList = lazy(() => import('../pages/ProductList'))
const PageNotFound = lazy(() => import('../pages/PageNotFound'))

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
                          <Suspense>
                            <Cart/>
                          </Suspense>
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
                            element: 
                            <Suspense>
                              <Profile></Profile>
                            </Suspense>
                        },
                        {
                            path: path.changePassword,
                            element: 
                            <Suspense>
                              <ChangePassword></ChangePassword>
                            </Suspense>
                        }
                    ]
                },
                {
                    path: path.productDetail,
                    index: true,
                    element: (
                        <MainLayout>
                            <Suspense>
                              <ProductDetail></ProductDetail>
                            </Suspense>
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
                    element: 
                    <RegisterLayout>
                      <Suspense>
                        <Login/>
                      </Suspense>
                    </RegisterLayout>
                },
                {
                    path: path.register,
                    element: 
                      <RegisterLayout>
                        <Suspense>
                          <Register/>
                        </Suspense>
                      </RegisterLayout>
                },  
            ]
        },
        {
            path: "*",
            element: ( 
                <MainLayout>
                  <Suspense>
                    <PageNotFound/>
                  </Suspense>
                </MainLayout> 
            )
        }  
         
    ])
    return routeElements
}
