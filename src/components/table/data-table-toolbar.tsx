import { isEmpty } from '@/lib/utils'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { useDebouncedValue } from '@/lib/hooks'
import { DataTableFilter } from './data-table.types'

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    onSearch?: (value: string) => void
    renderActions?: () => React.ReactNode
    onClearSearch?: () => void
    filterOptions?: DataTableFilter<TData>[]
}

export function DataTableToolbar<TData>({
    table,
    onSearch,
    renderActions,
    onClearSearch = () => {},
    filterOptions = [],
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    const [value, setValue] = useState('')
    const [debounced] = useDebouncedValue(value, 400)

    useEffect(() => {
        if (debounced) {
            onSearch?.(debounced)
        }
    }, [debounced])

    return (
        <div className='flex items-center justify-between'>
            <div className='flex flex-1 items-center space-x-2'>
                <Input
                    placeholder='Filter...'
                    // value={(table.getColumn('username')?.getFilterValue() as string) ?? ''}
                    // onChange={(event) => table.getColumn('username')?.setFilterValue(event.target.value)}
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    className='h-8 w-[150px] lg:w-[250px]'
                />

                {(function () {
                    if (!isEmpty(filterOptions)) {
                        return filterOptions.map((filterOption, index) => {
                            const { column, title, options } = filterOption

                            return (
                                <DataTableFacetedFilter
                                    key={index}
                                    column={table.getColumn(column as string)}
                                    title={title}
                                    options={options}
                                />
                            )
                        })
                    }
                    return null
                })()}

                {(isFiltered || debounced) && (
                    <Button
                        variant='ghost'
                        onClick={() => {
                            setValue('')
                            onClearSearch()
                            table.resetColumnFilters()
                        }}
                        className='h-8 px-2 lg:px-3'
                    >
                        Clear
                        <Cross2Icon className='ml-2 h-4 w-4' />
                    </Button>
                )}
            </div>
            {/* <DataTableViewOptions table={table} /> */}

            {renderActions?.()}
        </div>
    )
}
