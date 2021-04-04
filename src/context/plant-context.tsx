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
  'habit',
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

  const validateInputs = useCallback((inputs: CollectionWithInputs[]) => {
    for (const input of inputs) {
      for (const field of REQUIRED_FIELDS) {
        if (!input[field]) {
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
  }, []);

  const handleEditPlantSubmit = useCallback(async () => {
    setInputErrors(null);
    validateInputs(plantCollectionWithInputs);
    if (inputErrors) return;

    await firestore
      .collection('users')
      .doc(user?.uid)
      .update({
        // add new plants to the array
        // without creating duplicates
        plants: firestoreFieldValue.arrayUnion(...plantCollectionWithInputs),
      });
  }, [
    firestore,
    firestoreFieldValue,
    inputErrors,
    plantCollectionWithInputs,
    user?.uid,
    validateInputs,
  ]);

  return (
    <PlantContext.Provider
      value={{
        currentCalendarId,
        plantCollection,
        plantCollectionWithInputs,
        inputErrors,
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
