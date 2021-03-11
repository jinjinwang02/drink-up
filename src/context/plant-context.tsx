import React, { useState, useContext, createContext } from 'react';
import 'firebase/auth';
import { Collection, CollectionWithInputs } from '../interfaces';

interface PlantContextProviderProps {
  children: React.ReactNode;
}

const PlantContext = createContext<any>({});

export const PlantProvider: React.FunctionComponent<PlantContextProviderProps> = ({
  children,
}: PlantContextProviderProps) => {
  const [plantCollection, setPlantCollection] = useState<Collection[]>([]);
  const [plantCollectionWithInputs, setPlantCollectionWithInputs] = useState<
    CollectionWithInputs[]
  >([]);
  return (
    <PlantContext.Provider
      value={{
        plantCollection,
        plantCollectionWithInputs,
        setPlantCollection,
        setPlantCollectionWithInputs,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};

export const usePlantContext: () => {
  plantCollection: Collection[];
  plantCollectionWithInputs: CollectionWithInputs[];
  setPlantCollection: (value: React.SetStateAction<Collection[]>) => void;
  setPlantCollectionWithInputs: (
    value: React.SetStateAction<CollectionWithInputs[]>
  ) => void;
} = () => useContext(PlantContext);
