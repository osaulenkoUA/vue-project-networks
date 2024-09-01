export interface INetworks {
  id: number;
  number: number;
  name: string;
  frequency?: string;
  alias?: string;
  description?: string;
  features?: string;
  x: number;
  y: number;
}

export interface IColumn{
  title: string
  align?: string
  sortable?: boolean
  key: string
}
