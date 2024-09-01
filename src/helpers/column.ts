import { TableColumn } from '@/types/tableColumn'

export const tableColumn = [
  new TableColumn({
    title: 'Номер',
    align: 'start',
    sortable: false,
    key: 'number'
  }),
  new TableColumn({
    title: 'Назва',
    key: 'name'
  }),
  new TableColumn({
    title: 'Частоти',
    key: 'frequency',
    sortable: false
  }),
  new TableColumn({
    title: 'Позивні',
    key: 'alias',
    sortable: false

  }),
  new TableColumn({
    title: 'Опис',
    key: 'description',
    sortable: false

  }),
  new TableColumn({
    title: 'Примітки',
    key: 'features',
    sortable: false

  }),
  new TableColumn({
    title: 'X',
    key: 'x',
    sortable: false

  }),
  new TableColumn({
    title: 'Y',
    key: 'y',
    sortable: false
  }),
  new TableColumn({
    title: 'Actions',
    key: 'actions',
    sortable: false
  })
]
