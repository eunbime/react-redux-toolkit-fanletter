import { createContext, useState } from "react";

export const MemberContext = createContext(null);

function MemberContextProvider(props) {
  const [selectedMember, setSelectedMember] = useState("");

  return (
    <MemberContext.Provider
      value={{ selectedMember, setSelectedMember }}
      {...props}
    />
  );
}

export default MemberContextProvider;
