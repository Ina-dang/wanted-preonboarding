import "./App.css"

const About: React.FC<{ push: (path: string) => void }> = ({ push }) => {
  return (
    <div>
      <h1>About Page</h1>
      <button onClick={() => push("/")}>Go to Root</button>
    </div>
  )
}

export default About
