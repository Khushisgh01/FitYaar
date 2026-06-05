import React from 'react'
import Sidebar from '../components/ui/Sidebar'
import HeroSection from '../components/ui/heroSection'
import CrisesNavBar from '../components/ui/crisesNavbar'
import { Outlet } from 'react-router-dom'

const CrisesSupport = () => {
    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-1 p-8 '>
                <div className='mb-8 text-center'>
                    <HeroSection heading="Crisis Support" subheading="If you're having thoughts of suicide or self-harm, please reach out for help immediately. You are not alone, and support is available 24/7." />

                </div>
                <CrisesNavBar />
                <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default CrisesSupport