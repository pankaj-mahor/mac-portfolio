import Navbar from "@components/Navbar";
import "./App.css";
import Welcome from "@components/Welcome";
import Dock from "@components/Dock";

function App() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
    </main>
  );
}

export default App;
