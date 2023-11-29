import { createContext, useState } from "react";
import fakeData from "fakeData.json";

export const LetterContext = createContext(null);

function LetterContextProvider(props) {
  const [letterList, setLetterList] = useState(fakeData);

  return (
    <LetterContext.Provider value={{ letterList, setLetterList }} {...props} />
  );
}

export default LetterContextProvider;
