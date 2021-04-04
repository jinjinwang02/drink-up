import { BoxProps } from './components/box/box';

export interface Collection {
  id: string;
  commonName: string;
  imageUrl: string;
}

export interface CollectionWithInputs extends Collection {
  habit?: string;
  lastWateredOn?: string;
  notes?: string;
}

export interface ButtonProps extends BoxProps {
  id?: string;
  type?: string;
  disabled?: boolean;
}
