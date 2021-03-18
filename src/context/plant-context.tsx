import React, { useState, useContext, createContext } from 'react';
import 'firebase/auth';
import { Collection, CollectionWithInputs } from '../interfaces';

interface PlantContextProviderProps {
  children: React.ReactNode;
}

interface PlantContextProps {
  plantCollection: Collection[];
  plantCollectionWithInputs: CollectionWithInputs[];
  setPlantCollection: (value: React.SetStateAction<Collection[]>) => void;
  setPlantCollectionWithInputs: (
    value: React.SetStateAction<CollectionWithInputs[]>
  ) => void;
}

const PlantContext = createContext<PlantContextProps>({
  plantCollection: [],
  plantCollectionWithInputs: [],
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

export const usePlantContext: () => PlantContextProps = () =>
  useContext(PlantContext);
