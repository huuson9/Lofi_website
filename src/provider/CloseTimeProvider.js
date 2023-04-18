import { useState, createContext } from "react";
export const CloseTimeContext = createContext();
const CloseTimeProvider = ({ children }) => {
  const [closeTime, setCloseTime] = useState(true);

  const reverseClose = () => {
    setCloseTime(!closeTime);
  };
  const contextValue = {
    closeTime,
    reverseClose,
  };
  return (
    // provide the context to the children components
    <CloseTimeContext.Provider value={contextValue}>
      {children}
    </CloseTimeContext.Provider>
  );
};
export default CloseTimeProvider;
