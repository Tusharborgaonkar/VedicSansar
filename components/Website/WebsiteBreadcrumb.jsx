import React from 'react'
import { WEBSITE_HOME } from '@/routes/WebsiteRoute'
import Link from 'next/link'

const WebsiteBreadcrumb = ({props}) => {
  return (
    <div className="py-10 flex justify-center items-center bg-[url('/assets/images/shopimg2.png')] bg-cover bg-center">
        <div>
            <h1 className='text-2xl font-semibold mb-2 text-center text-white'>{props.title}</h1>
            <ul className='flex items-center gap-2 justify-center'>
                <li className='flex gap-2'>
                    <Link href={WEBSITE_HOME} className='font-semibold text-white'>Home</Link>

                    {props.links.map((item , index)=>(
                        <p key={index}>
                            <span className='me-1 text-white'>/</span>
                            {item.href ?
                                <Link href={item.href} className='text-white'>{item.label}</Link>
                                :
                                <span className='text-white'>{item.label}</span>
                            }
                        </p>
                    ))}
                </li>
            </ul>
        </div>
    </div>
  )
}

export default WebsiteBreadcrumb
