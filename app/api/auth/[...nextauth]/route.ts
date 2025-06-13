// The [...nextauth] file in Next.js is a catch-all API route used specifically for handling NextAuth.js authentication routes.

import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

//  Since NextAuth() internally handles both GET and POST requests, we're exporting the same handler for both.

const handler = NextAuth(authOptions);

export {handler as GET , handler as POST};