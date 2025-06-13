import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
//   The middleware function will only be invoked if the authorized callback returns true. -->from docs


  function middleware() {
    return NextResponse.next();

  },
  {
    callbacks: {
      authorized: ({ token ,req }) =>{
        const {pathname} = req.nextUrl;

        //allow auth related routes :
// The middleware function will only be invoked if the authorized callback returns true. -->from docs


        if(pathname.startsWith("/api/auth") || pathname === "/login" || pathname === "/register" ){
            return true;

        }

        if(pathname === '/' || pathname.startsWith("api/videos")){
            return true;
        }

        return !!token;


      }
    },
  },
)

//This config tells us all the places where  my middleware  will run
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};