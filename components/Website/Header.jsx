'use client'
import { USER_DASHBOARD, WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logoDark from "@/public/assets/images/logo5.png";
import { IoIosSearch } from "react-icons/io";
import { LuCircleUserRound } from "react-icons/lu";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import userIcon from "@/public/assets/images/user-img.png"
import { HiBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import Search from "./Search";

const Header = () => {
  const auth = useSelector(store => store.authStore.auth);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const closeMenu = () => setIsMobileMenu(false);

  return (
    <div className="bg-white border-b lg:px-32 md:px-8 px-4">
      <div className="flex min-h-16 items-center justify-between py-2 lg:min-h-20 lg:py-3">
        <Link href={WEBSITE_HOME} className="flex shrink-0 items-center">
          <Image
            src={logoDark.src}
            height={logoDark.height}
            width={logoDark.width}
            className="block dark:hidden h-auto w-[118px] sm:w-[140px] lg:w-[150px]"
            alt="logo Light"
          />
        </Link>

        <div className="flex items-center gap-3 lg:gap-8">
          <nav className={`lg:relative lg:w-auto lg:top-0 lg:left-0 lg:p-0 bg-white fixed z-50 top-0 w-full lg:h-auto h-screen transition-all ${isMobileMenu ? 'left-0' : '-left-full'}`}>

            <div className="lg:hidden flex justify-between items-center bg-amber-50 py-3 border-b px-3">
              <Image
                src={logoDark.src}
                height={logoDark.height}
                width={logoDark.width}
                className="block dark:hidden w-[140px] h-auto"
                alt="logo Light"
              />
              <button type="button" onClick={closeMenu}>
                <IoClose size={25} className="text-gray-900 hover:text-primary cursor-pointer" />
              </button>
            </div>

            <ul className="lg:flex items-center justify-between gap-7 px-3 xl:gap-9">
              <li className="text-amber-800 hover:text-primary hover:font-semibold">
                <Link href={WEBSITE_HOME} onClick={closeMenu} className="block py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 lg:hover:after:w-full">
                  Home
                </Link>
              </li>
              <li className="text-amber-800 hover:text-primary hover:font-semibold">
                <Link href="/about-us" onClick={closeMenu} className="block py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 lg:hover:after:w-full">
                  About
                </Link>
              </li>
              <li className="text-amber-800 hover:text-primary hover:font-semibold">
                <Link href={WEBSITE_SHOP} onClick={closeMenu} className="block py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 lg:hover:after:w-full">
                  Shop
                </Link>
              </li>
              <li className="text-amber-800 hover:text-primary hover:font-semibold">
                <Link href={`${WEBSITE_SHOP}?category=bracelets`} onClick={closeMenu} className="block py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 lg:hover:after:w-full">
                  Bracelets
                </Link>
              </li>
              <li className="text-amber-800 hover:text-primary hover:font-semibold">
                <Link href={`${WEBSITE_SHOP}?category=gem-stones`} onClick={closeMenu} className="block py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 lg:hover:after:w-full">
                  Gems
                </Link>
              </li>
              <li className="text-amber-800 hover:text-primary hover:font-semibold">
                <Link href={`${WEBSITE_SHOP}?category=pendants`} onClick={closeMenu} className="block py-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 lg:hover:after:w-full">
                  Pendants
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center justify-between gap-4">
            <button type="button" onClick={() => setShowSearch(!showSearch)}>
              <IoIosSearch className="text-gray-800 hover:text-primary cursor-pointer" size={25} />
            </button>

            <Cart />

            {!auth ?
              <Link href={WEBSITE_LOGIN}>
                <LuCircleUserRound className="text-gray-700 hover:text-primary cursor-pointer" size={25} />
              </Link>
              :
              <Link href={USER_DASHBOARD}>
                <Avatar>
                  <AvatarImage src={auth?.avatar?.url || userIcon.src} />
                </Avatar>
              </Link>
            }

            <button type="button" className="lg:hidden block" onClick={() => setIsMobileMenu(true)}>
              <HiBars3 size={25} className="text-gray-900 hover:text-primary cursor-pointer mr-2" />
            </button>
          </div>
        </div>
      </div>

      <Search isShow={showSearch} />
    </div>
  );
};

export default Header;
