"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { reduxclientstore } from "../store";

interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={reduxclientstore}>{children}</Provider>;
};

export default ReduxProvider;
