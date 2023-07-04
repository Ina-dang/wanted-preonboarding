import React, { FC, createContext, useEffect, useState } from "react"

type RouterContextType = {
  push: (path: string) => void
}
export const RouterContext = createContext<RouterContextType | undefined>(
  undefined
)

const Router: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  const push = (path: string) => {
    window.history.pushState({}, "", path)
    setCurrentPath(path)
  }

  return (
    <RouterContext.Provider value={{ push }}>
      <div>{children}</div>
    </RouterContext.Provider>
  )
}

export default Router
