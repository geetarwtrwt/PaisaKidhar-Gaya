import { NextResponse } from "next/server";

export let middleware = async (request) => {
  let path = request.nextUrl.pathname;
  let publicpath = path === "/login" || path === "/signup";
  let token = request.cookies.get("token")?.value || "";

  if (publicpath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (!publicpath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
};

export let config = {
  matcher: ["/", "/login/:path*", "/signup/:path*"],
};
