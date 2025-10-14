import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdOutlineShoppingBag } from "react-icons/md";
import { GiGemPendant } from "react-icons/gi";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import AdminLogo from '@/public/assets/images/Admin-logo.png'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import LogoutButton from './LogoutButton';
const UserDropdown = () => {
    const auth = useSelector((store)=>store.authStore.auth);
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src={AdminLogo.src}  alt='ADMIN Logo'  />
                    
                </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="me-5 w-44">
            <DropdownMenuLabel>
                <p className='font-semibold '>{auth?.name}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="" className='cursor-pointer'>
                    <GiGemPendant />
                    New Product
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild> 
                <Link href="" className='cursor-pointer'>
                    <MdOutlineShoppingBag />
                     Orders
                </Link>
                </DropdownMenuItem>

            <LogoutButton />
        </DropdownMenuContent>
</DropdownMenu>
  )
}

export default UserDropdown
