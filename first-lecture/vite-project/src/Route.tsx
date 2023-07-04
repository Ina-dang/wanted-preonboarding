import * as React from "react"
import { FC, useContext } from "react"
import { RouterContext } from "./Router"

interface RouteProps {
  path: string
  component: React.ComponentType<any>
}

const Route: React.FC<RouteProps> = ({ path, component: Component }) => {
  const { push } = useContext(RouterContext)!

  return window.location.pathname === path ? <Component push={push} /> : null
}

export default Route as typeof Route
