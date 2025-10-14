"use client"
import React from 'react'
import ThemeSwitch from './ThemeSwitch'
import UserDropdown from './UserDropdown'
import { Button } from '@/components/ui/button'
import { HiMenu } from "react-icons/hi";
import { useSidebar } from '@/components/ui/sidebar';
import AdminSearch from './AdminSearch'
import logoDark from "@/public/assets/images/logo5.png"
import Image from 'next/image'
import AdminMobileSearch from './AdminMobileSearch'


const Topbar = () => {
    const {toggleSidebar} = useSidebar();

  return (
    <div className='fixed border h-15 w-full top-0 left-0 z-30 md:pl-72 md:pr-8 px-7 flex justify-between items-center bg-white dark:bg-card'>
      <div className='flex items-center md:hidden'>
          <Image src={logoDark.src} height={logoDark.height} width={logoDark.width} className='block h-[150px] dark:hidden max-w-[250px] w-auto' alt='logo Light'  style={{ marginLeft: "-3rem"}}/>
          <Image src={logoDark.src} height={logoDark.height} width={logoDark.width} className='hidden h-[150px] dark:block max-w-[250px] w-auto' alt='logo Dark' style={{ marginLeft: "-3rem" }}/>
          
      </div>
      <div className='md:block hidden'>
        <AdminSearch />
      </div>

      <div className='flex items-center gap-2 '>
            <AdminMobileSearch />
            <ThemeSwitch />
            <UserDropdown />
            <Button onClick={toggleSidebar} type="button" size="icon" className="ms-2 md:hidden mr-2 bg-white border-2 border-amber-700 text-black hover:bg-amber-700 hover:text-white">
                <HiMenu />
            </Button>
      </div>

    </div>
  )
}

export default Topbar
