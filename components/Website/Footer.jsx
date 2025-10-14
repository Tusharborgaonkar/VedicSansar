import Image from "next/image";
import React from "react";
import logoDark from "@/public/assets/images/logo5.png";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { USER_DASHBOARD, WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_REGISTER, WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import { BsYoutube } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-amber-950 border  border-t-amber-800 ">
      <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-10 py-10 lg:px-32 px-4">
        <div className="lg:col-span-1 md:col-span-2 col-span-1">
          <Image
            src={logoDark.src}
            height={logoDark.height}
            width={logoDark.width}
            className="block h-[180px] dark:hidden max-w-[250px] w-auto"
            alt="logo Light"
            style={{
              marginTop: "-5rem",
              marginLeft: "-3rem",
              marginBottom: "-4rem",
            }}
          />

          <p className="text-white text-sm  mt-4">
            Vedic Sansar - where tradition meets trust and spirituality meets
            style. Vedic Sansar brings you authentic gemstones, malas, and
            spiritual accessories rooted in ancient traditions. Each product is
            carefully chosen for purity, energy, and timeless value. 
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold uppercase mb-5 text-white underline underline-offset-2">Categories</h4>
          <ul>
            <li className="mb-2 text-gray-50 hover:font-semibold text-sm ">
              <Link href={`${WEBSITE_SHOP}?category=bracelets`}>Bracelets</Link>
            </li>

            <li className="mb-2 text-gray-50 hover:font-semibold text-sm">

            <Link href={`${WEBSITE_SHOP}?category=pendants`}>Pendants</Link>
            </li>


            <li className="mb-2 text-gray-50 hover:font-semibold text-sm">

            <Link href={`${WEBSITE_SHOP}?category=gem-stones`}>Gem Stones</Link>
            </li>


            <li className="mb-2 text-gray-50 hover:font-semibold text-sm">

            <Link href={`${WEBSITE_SHOP}?category=ring`}>Ring</Link>
            </li>


            <li className="mb-2 text-gray-50 hover:font-semibold text-sm">

            <Link href={`${WEBSITE_SHOP}?category=Rudraksh`}>Rudraksha</Link>
            </li>

          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold uppercase mb-5 text-white underline underline-offset-2">Links</h4>
          <ul>
            <li className="mb-2 text-gray-50 hover:font-semibold text-sm">
              <Link href={WEBSITE_HOME}>Home</Link>
            </li>

            <li className="mb-2 text-gray-50 hover:font-semibold text-sm">

            <Link href={WEBSITE_SHOP}>Shop</Link>
            </li>


            <li className="mb-2 text-gray-50 hover:font-semibold text-sm">

            <Link href="/about-us">About</Link>
            </li>


            <li className="mb-2 text-gray-50 hover:font-semibold text-sm">

            <Link href={WEBSITE_REGISTER}>Register</Link>
            </li>


            <li className="mb-2 text-gray-50 hover:font-semibold text-sm">

            <Link href={WEBSITE_LOGIN}>Login</Link>
            </li>

          </ul>
        </div>

          <div>
          <h4 className="text-xl font-bold uppercase mb-5 text-white underline underline-offset-2">Help Center</h4>
          <ul>
            <li className="mb-2 text-gray-50 hover:font-semibold text-sm">
              <Link href={WEBSITE_REGISTER}>Register</Link>
            </li>

            <li className="mb-2 text-gray-50 hover:font-semibold text-sm">

            <Link href={WEBSITE_LOGIN}>Login</Link>
            </li>


            <li className="mb-2 text-gray-50 hover:font-semibold text-sm">

            <Link href={USER_DASHBOARD}>My Account</Link>
            </li>


            <li className="mb-2 text-gray-50 hover:font-semibold text-sm">

            <Link href="/privacy-policy">Privacy Policy</Link>
            </li>


            <li className="mb-2 text-gray-50 hover:font-semibold text-sm">

            <Link href="/terms-and-conditions">Terms & Conditions</Link>
            </li>

          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold uppercase mb-5 text-white underline underline-offset-2">
            Contact Us
          </h4>

          <ul>
            <li className="mb-2 text-gray-50 flex gap-2">
              <CiLocationOn size={30} />

              <span className="text-sm">
                Rishikesh , central Market , Uttarakhand
              </span>
            </li>

            <li className="ml-1 mb-2 text-gray-50 flex gap-2">
              <IoCallOutline size={20} />

              <Link href="tel:+91-7827709624" className="  text-sm">
                +91-7827709624 <br /> (available 10am - 6pm)
              </Link>
            </li>

            <li className="ml-1 mb-2 text-gray-50 flex gap-2">
              <MdOutlineEmail size={20} />

              <Link href="mailto:vedicsansar125@gmail.com" className="  text-sm">
                vedicsansar125@gmail.com
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-5 mt-5 ml-1">
            <Link href="" ><BsYoutube  className="text-red-500 hover:text-red-500" size={25} /></Link>
            <Link href="" ><FaInstagram className="text-white hover:text-fuchsia-400" size={25}  /></Link>
            <Link href="" ><FaWhatsapp className="text-green-500 hover:text-green-700" size={25}  /></Link>
            <Link href="" ><FaFacebookSquare className="text-sky-300 hover:text-sky-100" size={25}  /></Link>


          </div>
        </div>
      </div>

      <div className="py-5 bg-gray-100">
            
            <p className="text-center text-sm">&copy;2025 Vedic Sansar. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
