import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import Home from "./pages/Home";
import ShowDetails from "./pages/ShowDetails";

/**
 * Main application component that sets up routing and renders the header and page content
 *
 * @returns {JSX.Element}
 */
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetails />} />
      </Routes>
    </>
  );
}

export default App;
