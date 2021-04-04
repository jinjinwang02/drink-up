import { BoxProps } from './components/box/box';

export interface Collection {
  id: string;
  commonName: string;
  imageUrl?: string;
}

export interface CollectionWithInputs extends Collection {
  schedule?: string;
  lastWateredOn?: string;
  notes?: string;
  createdAt?: string;
}

export interface CustomCollectionWithInputs
  extends Omit<CollectionWithInputs, 'commonName'> {
  commonName?: string;
}
export interface ButtonProps extends BoxProps {
  id?: string;
  type?: string;
  disabled?: boolean;
}
