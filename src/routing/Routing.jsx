import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Home from '../pages/dashboard/Home'
import SignUp from '../pages/auth/SignUp'
import WithAuthLayout from '../layout/AuthLayout'
import HomeLayout from '../layout/HomeLayout'
import MyOrder from '../pages/dashboard/MyOrder'
import MyOrderList from '../pages/dashboard/MyOrderList'
import MyProfile from '../pages/dashboard/MyProfile'
import ProfileLayout from '../layout/ProfileLayout'
import Products from '../pages/dashboard/Products'

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WithAuthLayout><Login /></WithAuthLayout>} />
                <Route path="/signup" element={<WithAuthLayout><SignUp /></WithAuthLayout>} />
                <Route path="/home" element={<HomeLayout><Home /></HomeLayout>} />
                <Route path="/myprofile" element={<ProfileLayout><MyProfile /></ProfileLayout>} />
                <Route path="/myorder" element={<HomeLayout><MyOrder /></HomeLayout>} />
                <Route path="/products" element={<HomeLayout><Products /></HomeLayout>} />
                <Route path="/myorder/:id" element={<HomeLayout><MyOrderList /></HomeLayout>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing