import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import dataDemo from "./dataDemo";

export type DataProps = {
  label: string;
  content: string;
  desc?: string;
  createdAt: Date;
  views: number;
  order: number;
  id: string;
};

type UpdateDataProp = Dispatch<SetStateAction<DataProps[]>>;

type AppContextType = {
  data: DataProps[];
  updateData: UpdateDataProp;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DataProps[]>(dataDemo || []);

  const updateData: UpdateDataProp = (newData) => {
    setData(newData);
  };

  return (
    <AppContext.Provider value={{ data, updateData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
