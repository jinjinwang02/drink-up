import React, { useState, useContext, createContext } from 'react';
import 'firebase/auth';
import { Collection, CollectionWithInputs } from '../interfaces';

interface PlantContextProviderProps {
  children: React.ReactNode;
}

interface PlantContextProps {
  currentCalendar: string;
  plantCollection: Collection[];
  plantCollectionWithInputs: CollectionWithInputs[];
  setCurrentCalendar: (value: React.SetStateAction<string>) => void;
  setPlantCollection: (value: React.SetStateAction<Collection[]>) => void;
  setPlantCollectionWithInputs: (
    value: React.SetStateAction<CollectionWithInputs[]>
  ) => void;
}

const PlantContext = createContext<PlantContextProps>({
  currentCalendar: '',
  plantCollection: [],
  plantCollectionWithInputs: [],
  setCurrentCalendar: () => null,
  setPlantCollection: () => null,
  setPlantCollectionWithInputs: () => null,
});

export const PlantProvider: React.FC<PlantContextProviderProps> = ({
  children,
}: PlantContextProviderProps) => {
  const [plantCollection, setPlantCollection] = useState<Collection[]>([]);
  const [plantCollectionWithInputs, setPlantCollectionWithInputs] = useState<
    CollectionWithInputs[]
  >([]);
  const [currentCalendar, setCurrentCalendar] = useState<string>('');
  return (
    <PlantContext.Provider
      value={{
        currentCalendar,
        plantCollection,
        plantCollectionWithInputs,
        setCurrentCalendar,
        setPlantCollection,
        setPlantCollectionWithInputs,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};

export const usePlantContext: () => PlantContextProps = () =>
  useContext(PlantContext);
