"use client"
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import logoDark from "@/public/assets/images/logo5.png"
import { Button } from '@/components/ui/button'
import { LuChevronRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { adminSidebarMenu } from '@/lib/adminSidebarMenu'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import Link from 'next/link'
import { useSidebar } from '@/components/ui/sidebar';

const AppSidebar = () => {
  const {toggleSidebar} = useSidebar();
  return (
      <Sidebar className="z-50">
      <SidebarHeader className="border-b h-15 p-0">
        <div className='flex justify-between items-center px-4'>
            <Image src={logoDark.src} height={logoDark.height} width={logoDark.width} className='block h-[150px] dark:hidden max-w-[250px] w-auto' alt='logo Light'  style={{marginTop : "-3rem", marginLeft: "-3rem"}}/>
            <Image src={logoDark.src} height={logoDark.height} width={logoDark.width} className='hidden h-[150px] dark:block max-w-[250px] w-auto' alt='logo Dark' style={{marginTop : "-3rem", marginLeft: "-3rem" }}/>
            
            <Button onClick={toggleSidebar} type="button" size="icon" className="md:hidden bg-white border-2 border-amber-700 text-black hover:bg-amber-700 hover:text-white" style= {{marginTop:"-2.7rem"}}>
                    <IoMdClose />
            </Button>

  
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarMenu>
          {adminSidebarMenu.map((menu, index)=>(
            <Collapsible key={index} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild className="font-bold px-2 py-5">
                          <Link href={menu?.url}>
                                <menu.icon />
                                {menu.title}

                                {menu.submenu && menu.submenu.length > 0 && 
                                  <LuChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                }
                          </Link>
                      </SidebarMenuButton>
                  </CollapsibleTrigger>


                  {menu.submenu && menu.submenu.length > 0 

                    &&

                    <CollapsibleContent>
                        <SidebarMenuSub>
                           {menu.submenu.map((submenuItem , subMenuIndex)=>(
                              <SidebarMenuSubItem key={subMenuIndex}>
                                 <SidebarMenuSubButton asChild className="px-2 py-5">
                                    <Link href={submenuItem.url}>
                                      {submenuItem.title}
                                    </Link>
                                 </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                           ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                  }
                </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>

  )
}

export default AppSidebar





  