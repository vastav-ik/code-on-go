import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute =
    req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/pricing";
  const isSignInRoute = req.nextUrl.pathname === "/sign-in";

  if (isAuthRoute) return undefined; // Let auth routes pass

  if (!isLoggedIn && !isPublicRoute && !isSignInRoute) {
    let callbackUrl = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      callbackUrl += req.nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, req.nextUrl),
    );
  }

  return undefined;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
