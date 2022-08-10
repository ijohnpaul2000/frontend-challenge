import { PokemonProvider } from "./context/pokemonContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./layouts/SharedLayout";
import Homepage from "./pages/Homepage";
import SinglePokemon from "./components/SinglePokemon";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

let order = 0;
let isAllClicked = false;
function App() {
  const [boxState, setBoxState] = useState(getBoxes("initial"));

  const changeColor = (i, j) => {
    let temp = [...boxState];
    const selectedBox = temp.find((item) => item.i === i && item.j === j);
    selectedBox.isClicked = !selectedBox.isClicked;
    selectedBox.order = ++order;
    temp.sort((a, b) => a.order - b.order);
    setBoxState(temp);
    console.log(temp);
  };

  useEffect(() => {
    if (boxState.some((box) => !box.isClicked)) {
      isAllClicked = false;
    } else {
      isAllClicked = true;
    }
    if (isAllClicked) {
      boxState.forEach((item, index) => {
        return setTimeout(() => {
          let tempBox = [...boxState];
          tempBox[index].isClicked = false;
          setBoxState(tempBox);
        }, 1000 * (index + 1));
      });
    }
  }, [boxState]);

  function getBoxes(type) {
    let boxesData = [];
    const boxes = [0, 1, 2].map((i) => {
      return [0, 1, 2].map((j) => {
        if (!(i === 1 && j > 0)) {
          if (type === "initial") {
            return boxesData.push({ i, j, isClicked: false, order: null });
          }
          return (
            <div
              style={{
                backgroundColor:
                  boxState.find((item) => item.i === i && item.j === j)
                    .isClicked && "green",
              }}
              className="border-white border-2 p-3"
              onClick={() => changeColor(i, j)}
            >{`I${i},j${j}`}</div>
          );
        }
        return <div className="">{`I${i},j${j}`}</div>;
      });
    });

    if (type === "initial") {
      return boxesData;
    }
    return boxes;
  }
  return (
    // <PokemonProvider>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<SharedLayout />}>
    //         <Route path="/" element={<Homepage />} />
    //         <Route path="/pokemon/:name" element={<SinglePokemon />} />
    //       </Route>
    //       <Route path="*" element={<NotFound />} />
    //     </Routes>
    //   </BrowserRouter>
    // </PokemonProvider>

    <div className="h-screen flex items-center justify-center">
      <div className="grid grid-cols-3 text-white">{getBoxes()}</div>
    </div>
  );
}

export default App;
