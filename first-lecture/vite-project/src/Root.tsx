import "./App.css"

const Root: React.FC<{ push: (path: string) => void }> = ({ push }) => {
  return (
    <div>
      <h1>Root Page</h1>
      <button onClick={() => push("/about")}>Go to About</button>
    </div>
  )
}

export default Root
