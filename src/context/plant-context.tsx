import React, { useState, useContext, createContext, useCallback } from 'react';
import 'firebase/auth';
import {
  Collection,
  CollectionWithInputs,
  CustomCollectionWithInputs,
} from '../interfaces';
import { useAuthContext } from './auth-context';
import { getPlantInputErrorMessage } from '../utils';
import { firebaseClient } from '../firebase/firebase-client';

const REQUIRED_FIELDS: (keyof CollectionWithInputs)[] = [
  'id',
  'commonName',
  'lastWateredOn',
  'schedule',
];

interface PlantContextProviderProps {
  children: React.ReactNode;
}

interface PlantContextProps {
  currentCalendarId: string | null;
  plantCollection: Collection[];
  plantCollectionWithInputs: CollectionWithInputs[];
  customCollectionWithInputs: CustomCollectionWithInputs[];
  inputErrors: {
    [id: string]: { name: keyof CollectionWithInputs; errorMessage: string }[];
  } | null;
  setCurrentCalendarId: (value: React.SetStateAction<string | null>) => void;
  setPlantCollection: (value: React.SetStateAction<Collection[]>) => void;
  setPlantCollectionWithInputs: (
    value: React.SetStateAction<CollectionWithInputs[]>
  ) => void;
  setCustomCollectionWithInputs: (
    value: React.SetStateAction<CustomCollectionWithInputs[]>
  ) => void;
  handleAddPlants: (inputs: CollectionWithInputs[]) => void;
  handleEditPlants: (inputs: CollectionWithInputs[], cb: () => void) => void;
  handleSetInput: (id: string | undefined, name: string, value: string) => void;
}

const PlantContext = createContext<PlantContextProps>({
  currentCalendarId: null,
  plantCollection: [],
  plantCollectionWithInputs: [],
  customCollectionWithInputs: [],
  inputErrors: null,
  setCurrentCalendarId: () => null,
  setPlantCollection: () => null,
  setPlantCollectionWithInputs: () => null,
  setCustomCollectionWithInputs: () => null,
  handleAddPlants: () => null,
  handleEditPlants: () => null,
  handleSetInput: () => null,
});

export const PlantProvider: React.FC<PlantContextProviderProps> = ({
  children,
}: PlantContextProviderProps) => {
  const { firestore } = firebaseClient();
  const { user } = useAuthContext();
  const [plantCollection, setPlantCollection] = useState<Collection[]>([]);
  const [plantCollectionWithInputs, setPlantCollectionWithInputs] = useState<
    CollectionWithInputs[]
  >([]);
  const [customCollectionWithInputs, setCustomCollectionWithInputs] = useState<
    CustomCollectionWithInputs[]
  >([]);
  const [currentCalendarId, setCurrentCalendarId] = useState<string | null>(
    null
  );
  const [inputErrors, setInputErrors] = useState<{
    [id: string]: { name: keyof CollectionWithInputs; errorMessage: string }[];
  } | null>(null);

  const handleSetInput = useCallback(
    (plantId: string | undefined, name, value) => {
      if (!plantId) return;
      if (plantCollectionWithInputs.map((el) => el.id).includes(plantId)) {
        const currentPlant = plantCollectionWithInputs.filter(
          (el) => el.id === plantId
        )[0];
        setPlantCollectionWithInputs((prev) => [
          ...prev.filter((el) => el !== currentPlant),
          { ...currentPlant, [name]: value },
        ]);
      }

      if (customCollectionWithInputs.map((el) => el.id).includes(plantId)) {
        const currentCustomPlant = customCollectionWithInputs.filter(
          (el) => el.id === plantId
        )[0];
        setCustomCollectionWithInputs((prev) => [
          ...prev.filter((el) => el !== currentCustomPlant),
          { ...currentCustomPlant, [name]: value },
        ]);
      }
    },
    [customCollectionWithInputs, plantCollectionWithInputs]
  );

  const addPlantEntries = useCallback(
    async (plants: CollectionWithInputs[]) => {
      const plantWithIdAsKey = plants.map((el) => ({
        [el.id]: { ...el, createdAt: new Date().toISOString() },
      }));
      const plantObjects = Object.assign({}, ...plantWithIdAsKey);
      await firestore
        .doc(`users/${user?.uid}`)
        ?.set({ plants: plantObjects }, { merge: true });
    },
    [firestore, user?.uid]
  );

  const updatePlantEntry = useCallback(
    async (newPlantEntry: CollectionWithInputs) => {
      await firestore.doc(`users/${user?.uid}`).update({
        ['plants.' + newPlantEntry.id]: {
          ...newPlantEntry,
          createdAt: newPlantEntry.createdAt,
          updatedAt: new Date().toISOString(),
        },
      });
    },
    [firestore, user?.uid]
  );

  const handleAddPlants = useCallback(
    async (plantInputs: CollectionWithInputs[]) => {
      setInputErrors(null);
      let errorCount = 0;
      for (const input of plantInputs) {
        for (const field of REQUIRED_FIELDS) {
          if (!input[field]) {
            errorCount += 1;
            setInputErrors((prev: any) => ({
              ...prev,
              [input.id]: [
                ...(prev && prev[input.id] ? prev[input.id] : []),
                { name: field, errorMessage: getPlantInputErrorMessage(field) },
              ],
            }));
          }
        }
      }
      if (!errorCount) {
        await addPlantEntries(plantInputs);
      }
    },
    [addPlantEntries]
  );

  const handleEditPlants = useCallback(
    async (plantInputs: CollectionWithInputs[], cb: () => void) => {
      setInputErrors(null);
      let errorCount = 0;
      for (const input of plantInputs) {
        for (const field of REQUIRED_FIELDS) {
          if (!input[field]) {
            errorCount += 1;
            setInputErrors((prev: any) => ({
              ...prev,
              [input.id]: [
                ...(prev && prev[input.id] ? prev[input.id] : []),
                { name: field, errorMessage: getPlantInputErrorMessage(field) },
              ],
            }));
          }
        }
      }
      if (!errorCount) {
        await Promise.all(
          plantInputs.map(async (plant) => await updatePlantEntry(plant))
        )
          .then(() => cb())
          .catch((err) => console.log(err));
      }
    },
    [updatePlantEntry]
  );

  return (
    <PlantContext.Provider
      value={{
        currentCalendarId,
        plantCollection,
        plantCollectionWithInputs,
        customCollectionWithInputs,
        inputErrors,
        setCurrentCalendarId,
        setPlantCollection,
        setPlantCollectionWithInputs,
        setCustomCollectionWithInputs,
        handleSetInput,
        handleAddPlants,
        handleEditPlants,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};

export const usePlantContext: () => PlantContextProps = () =>
  useContext(PlantContext);
