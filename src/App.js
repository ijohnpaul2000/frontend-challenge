import { PokemonProvider } from "./context/pokemonContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./layouts/SharedLayout";
import Homepage from "./pages/Homepage";
import SinglePokemon from "./components/SinglePokemon";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <PokemonProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/pokemon/:name" element={<SinglePokemon />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </PokemonProvider>
  );
}

export default App;
