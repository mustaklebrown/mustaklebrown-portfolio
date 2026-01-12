import SideNav from '@/components/shared/sidenav'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='relative z-10 min-h-screen lg:pl-32'>
            <SideNav />
            <div className="px-6 md:px-12 max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    )
}

export default layout