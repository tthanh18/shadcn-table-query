import { ColumnDef } from '@tanstack/react-table'

export type DataTableFilter<TData> = {
    column?: keyof TData
    title?: string
    options: {
        label: string
        value: string
        icon?: React.ComponentType<{ className?: string }>
    }[]
}

export type DataTableColumn<TData, TValue = any> = ColumnDef<TData, TValue> & {
    sticky?: 'left' | 'right'
    isSticky?: boolean
    width?: number
}
