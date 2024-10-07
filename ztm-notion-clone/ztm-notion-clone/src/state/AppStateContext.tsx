// Now we have usePageState hook , we can create AppStateContext

import { Children, createContext, useContext } from "react";
import { usePageState } from "./usePageState"; // we need to specify the type of value that we want to make available through the app inside of this context
import { Page } from "../utils/types";

type AppStateContextType = ReturnType<typeof usePageState>;
// This context will provide the state and functions/methods from the usePageState hook to the components that needs them
export const AppStateContext = createContext<AppStateContextType>(
  {} as AppStateContextType // we pass empty object as default value
);

// we need to define the APpStateProvider component that we'll wrap our application into

type AppStateProviderProps = {
  children: React.ReactNode;
  initialState: Page;
};

export const AppStateProvider = ({
  children,
  initialState,
}: AppStateProviderProps) => {
  const pageStateHandlers = usePageState(initialState);
  return (
    <AppStateContext.Provider value={pageStateHandlers}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
