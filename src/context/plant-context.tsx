import React, { useState, useContext, createContext, useCallback } from 'react';
import 'firebase/auth';
import { Collection, CollectionWithInputs } from '../interfaces';
import { firebaseClient } from '../firebase/firebase-client';
import { useAuthContext } from './auth-context';
import { getPlantInputErrorMessage } from '../utils';

const REQUIRED_FIELDS: (keyof CollectionWithInputs)[] = [
  'id',
  'commonName',
  'imageUrl',
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
  inputErrors: {
    [id: string]: { name: keyof CollectionWithInputs; errorMessage: string }[];
  } | null;
  validateInputs: (inputs: CollectionWithInputs[]) => void;
  setCurrentCalendarId: (value: React.SetStateAction<string | null>) => void;
  setPlantCollection: (value: React.SetStateAction<Collection[]>) => void;
  setPlantCollectionWithInputs: (
    value: React.SetStateAction<CollectionWithInputs[]>
  ) => void;
  handleEditPlantSubmit: () => void;
}

const PlantContext = createContext<PlantContextProps>({
  currentCalendarId: null,
  plantCollection: [],
  plantCollectionWithInputs: [],
  inputErrors: null,
  validateInputs: () => null,
  setCurrentCalendarId: () => null,
  setPlantCollection: () => null,
  setPlantCollectionWithInputs: () => null,
  handleEditPlantSubmit: () => null,
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
  const [currentCalendarId, setCurrentCalendarId] = useState<string | null>(
    null
  );
  const [inputErrors, setInputErrors] = useState<{
    [id: string]: { name: keyof CollectionWithInputs; errorMessage: string }[];
  } | null>(null);

  const validateInputs = useCallback(
    async (inputs: CollectionWithInputs[]) => {
      let errorCount = 0;
      for (const input of inputs) {
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
        await firestore
          .collection('users')
          .doc(user?.uid)
          .update({
            // add new plants to the array
            // without creating duplicates
            plants: firestoreFieldValue.arrayUnion(
              ...plantCollectionWithInputs.map((el) => ({
                ...el,
                createdAt: new Date(),
              }))
            ),
          });
      }
    },
    [firestore, firestoreFieldValue, plantCollectionWithInputs, user?.uid]
  );

  const handleEditPlantSubmit = useCallback(async () => {
    setInputErrors(null);
    validateInputs(plantCollectionWithInputs);
  }, [plantCollectionWithInputs, validateInputs]);

  return (
    <PlantContext.Provider
      value={{
        currentCalendarId,
        plantCollection,
        plantCollectionWithInputs,
        inputErrors,
        validateInputs,
        setCurrentCalendarId,
        setPlantCollection,
        setPlantCollectionWithInputs,
        handleEditPlantSubmit,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};

export const usePlantContext: () => PlantContextProps = () =>
  useContext(PlantContext);
