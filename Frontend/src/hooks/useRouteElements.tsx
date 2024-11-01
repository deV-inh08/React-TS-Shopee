import {Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from '../pages/ProductList'
import Login from '../pages/Login'
import Register from '../pages/Register'
import RegisterLayout from '../layouts/RegisterLayout/RegisterLayout'
import MainLayout from '../layouts/MainLayout'
import PageNotFound from '../pages/PageNotFound'
import Profile from '../pages/Profile'
import { useContext } from 'react'
import { AppContext } from '../contexts/app.context'
import path from '../constants/path'



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
                    path: path.profile,
                    element: (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    )
                }
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
            path: "/*",
            element: <PageNotFound></PageNotFound>
        }   
    ])
    return routeElements
}
