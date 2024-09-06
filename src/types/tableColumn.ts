import type { IColumn, INetworks } from '@/types/networks'

// export class TableRow{
//
//   id: number;
//   number: number;
//   name: string;
//   frequency?: string;
//   alias?: string;
//   description?: string;
//   features?: string;
//   x: number;
//   y: number;
//   constructor(data:INetworks) {
//     this.id=data.id;
//     this.number=data.number
//     this.name=data.name
//     this.frequency=data.frequency
//     this.alias=data.alias
//     this.description=data.description
//     this.features=data.features
//     this.x=data.x
//     this.y=data.y
//   }
// }

export class TableColumn{
  title: string
  align?: string
  sortable?: boolean
  key: string
  constructor(data:IColumn) {
    this.title=data.title;
    this.align=data.align
    this.sortable=data.sortable
    this.key=data.key
  }
}

