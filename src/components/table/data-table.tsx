import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BaseSearchModel, ESortType } from '@/models'
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'
import { DataTablePagination } from './data-table-pagination'
import { DataTableSpin } from './data-table-spin'
import { DataTableToolbar } from './data-table-toolbar'
import { DataTableFilter } from './data-table.types'

export interface DataTableProps<TData, TSearch, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isLoading?: boolean
    params: TSearch
    total: number
    onParamsChange?: (params: TSearch) => void
    renderActions?: () => React.ReactNode
    filterOptions?: DataTableFilter<TData>[]
    //offset limit or page limit
    paginationType?: 'offset' | 'page'
}

export function DataTable<TData, TSearch extends BaseSearchModel, TValue = any>({
    columns,
    data,
    isLoading,
    total,
    params,
    onParamsChange,
    renderActions,
    filterOptions,
    paginationType = 'page',
}: DataTableProps<TData, TSearch, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [pagination, setPagination] = React.useState({
        pageSize: params.limit ?? 10,
        pageIndex: params.page ?? 0,
    })

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            // columnVisibility,
            // rowSelection,
            columnFilters,
            pagination,
        },
        rowCount: total,
        // enableRowSelection: true,

        onRowSelectionChange: setRowSelection,
        onSortingChange: (updater) => {
            setSorting((old) => {
                const newSortingValue = updater instanceof Function ? updater(old) : updater
                const sorted = newSortingValue[0]
                const newParams: TSearch = {
                    ...params,
                    orderBy: sorted.id,
                    orderType: sorted.desc ? ESortType.DESC : ESortType.ASC,
                }
                const isParamsChanged = newParams.orderBy !== params.orderBy || newParams.orderType !== params.orderType
                if (onParamsChange && isParamsChanged) {
                    onParamsChange(newParams)
                }
                return newSortingValue
            })
        },
        onColumnFiltersChange: (updater) => {
            setColumnFilters((old) => {
                const newColumnFiltersValue = updater instanceof Function ? updater(old) : updater

                //convert newColumnFiltersValue to object key-value
                const filters = newColumnFiltersValue.reduce((acc, filter) => {
                    acc[filter.id] = filter.value
                    return acc
                }, {})

                const newParams = {
                    ...params,
                    filters,
                }
                const isParamsChanged = JSON.stringify(newParams.filters) !== JSON.stringify(params.filters)
                if (onParamsChange && isParamsChanged) {
                    onParamsChange(newParams)
                }
                return newColumnFiltersValue
            })
        },
        onColumnVisibilityChange: setColumnVisibility,
        // onPaginationChange: setPagination,
        onPaginationChange: (updater) => {
            setPagination((old) => {
                const newPaginationValue = updater instanceof Function ? updater(old) : updater
                const newParams = {
                    ...params,
                    limit: newPaginationValue.pageSize,
                    page: newPaginationValue.pageIndex + 1,
                    ...(paginationType === 'offset' && { offset: newPaginationValue.pageIndex * newPaginationValue.pageSize }),
                }
                const isParamsChanged = newParams.limit !== params.limit || newParams.page !== params.page
                if (onParamsChange && isParamsChanged) {
                    onParamsChange(newParams)
                }
                return newPaginationValue
            })
        },
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        // getFilteredRowModel: getFilteredRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        // getSortedRowModel: getSortedRowModel(),
        // getFacetedRowModel: getFacetedRowModel(),
        // getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (
        <DataTableSpin isLoading={isLoading}>
            <div className='space-y-4'>
                <DataTableToolbar
                    filterOptions={filterOptions}
                    renderActions={renderActions}
                    table={table}
                    onClearSearch={() => {
                        onParamsChange({
                            ...params,
                            key: '',
                        })
                    }}
                    onSearch={(e) => {
                        onParamsChange({
                            ...params,
                            key: e,
                        })
                    }}
                />
                <div className='rounded-md border'>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} colSpan={header.colSpan}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                                        No data
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <DataTablePagination table={table} total={total} />
            </div>
        </DataTableSpin>
    )
}
