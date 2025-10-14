import { NextResponse } from "next/server";
import { USER_DASHBOARD, WEBSITE_LOGIN } from "./routes/WebsiteRoute";
import { jwtVerify } from "jose";
import { ADMIN_DASHBOARD } from "./routes/AdminPanelRoute";

export async function middleware(request){
    try {

        const pathname = request.nextUrl.pathname
        const hasToken = request.cookies.has('access_token');

        if(!hasToken){
            // if the user is not loggedin and trying to acess admin or protected routes
            if(!pathname.startsWith('/auth')){
                // redirect to login page
                return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
            }

            return NextResponse.next();
            // Allow all acess to auth routes if not logged in...
        }

        // if we have token -> verify token

        const access_token = request.cookies.get('access_token').value;
        const {payload} = await jwtVerify(access_token, new TextEncoder().encode(process.env.SECRET_KEY));

        const role = payload.role;

        // prevent logged-in user from auth routes

        if(pathname.startsWith('/auth')){
            return NextResponse.redirect(new URL(role === 'admin' ? ADMIN_DASHBOARD : USER_DASHBOARD , request.nextUrl ))
        }

        // protect admin route

        if(pathname.startsWith('/admin') && role!== 'admin')
        {
            // user is trying to access admin dashboard , so prevent it
                return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
        }

        if(pathname.startsWith('/my-account') && role!== 'user')
        {
            // user is trying to access admin dashboard , so prevent it
                return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
        }

        return NextResponse.next();

        
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl));
        
    }
}

export const config = {
    matcher: ['/admin/:path*', '/my-account/:path*','/auth/:path*']
}