export interface Collection {
  id: string;
  commonName: string;
  imageUrl: string;
}

export interface CollectionWithInputs extends Collection {
  habit?: string;
  date?: string;
  notes?: string;
}