import Weather from "./components/Weather"

function App() {
  const api = {
  key: "",
  baseuri:  "https://api.openweathermap.org/data/2.5/weather" 
}
  return (
    <>
    <Weather apikey = {api.key} apibaseurl = {api.baseuri} />
    </>
  )
}

export default App
