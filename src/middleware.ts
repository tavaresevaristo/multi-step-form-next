import { NextRequest, NextResponse } from "next/server";
import { publicRoutes } from "./constants/public-routes";

const REDIRECT_WHEN_AUTHENTICATED_ROUTE = "/";
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

export default function Middlware(request: NextRequest) {
  
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("token");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    // verificar se o JWT não está expirado
    // Se sim, remover o token e redirecionar para o login
    // Aplicar uma estratégia de refresh

    return NextResponse.next();
  }
}
