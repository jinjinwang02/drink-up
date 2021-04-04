import React, { useState, useContext, createContext, useCallback } from 'react';
import 'firebase/auth';
import firebase from 'firebase/app';
import {
  Collection,
  CollectionWithInputs,
  CustomCollectionWithInputs,
} from '../interfaces';
import { firebaseClient } from '../firebase/firebase-client';
import { useAuthContext } from './auth-context';
import { getPlantInputErrorMessage } from '../utils';

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
  handleAddOrEditPlants: (inputs: CollectionWithInputs[]) => void;
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
  handleAddOrEditPlants: () => null,
  handleSetInput: () => null,
});

export const PlantProvider: React.FC<PlantContextProviderProps> = ({
  children,
}: PlantContextProviderProps) => {
  const { user } = useAuthContext();
  const { firestore, firestoreFieldValue } = firebaseClient();
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

  const addPlantEntry = useCallback(
    async (
      userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
      plant: CollectionWithInputs
    ) => {
      await userRef.update({
        plants: firestoreFieldValue.arrayUnion({
          ...plant,
          createdAt: new Date(),
        }),
      });
    },
    [firestoreFieldValue]
  );

  const updatePlantEntry = useCallback(
    async (
      userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
      existingPlantEntry: CollectionWithInputs,
      plant: CollectionWithInputs
    ) => {
      await userRef.update({
        plants: firestoreFieldValue.arrayRemove(existingPlantEntry),
      });
      await userRef.update({
        plants: firestoreFieldValue.arrayUnion({
          ...plant,
          createdAt: existingPlantEntry.createdAt,
          updatedAt: new Date(),
        }),
      });
    },
    [firestoreFieldValue]
  );

  const handleAddOrEditPlants = useCallback(
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
        const userRef = firestore.doc(`users/${user?.uid}`);
        const existingPlants = (await userRef
          .get()
          .then((res) => res.data())
          .then((data) => data?.plants)) as CollectionWithInputs[] | [];
        const existingPlantsIds = existingPlants?.map(
          (el: CollectionWithInputs) => el.id
        );
        await Promise.all(
          plantInputs.map(async (plant) => {
            if (!existingPlantsIds?.includes(plant.id)) {
              addPlantEntry(userRef, plant);
            } else {
              const existingPlantEntry = existingPlants?.filter(
                (el) => el.id === plant.id
              )[0];
              updatePlantEntry(userRef, existingPlantEntry, plant);
            }
          })
        );
      }
    },
    [addPlantEntry, firestore, updatePlantEntry, user?.uid]
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
        handleAddOrEditPlants,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};

export const usePlantContext: () => PlantContextProps = () =>
  useContext(PlantContext);
