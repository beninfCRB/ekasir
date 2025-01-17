import { Navigate, useLocation } from "react-router"

export const ProtectedRoute = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const locale = JSON.parse(localStorage.getItem("user") as string)
  const location = useLocation()

  if (!locale && location.pathname !== '/signin') {
    return <Navigate replace={true} to="/signin" />
  }

  if (locale && location.pathname === '/signin') {
    return <Navigate replace={true} to={'/admin/product'} />
  }

  return children
}