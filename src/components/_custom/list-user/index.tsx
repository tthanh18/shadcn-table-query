import { FC, useCallback, useMemo, useState } from 'react'
import { DataTable, DataTableColumnHeader, DataTableFilter, DataTableRowActions } from '@/components/table'
import { BaseSearchModel } from '@/models'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { da, faker } from '@faker-js/faker'
import { toast } from 'react-hot-toast'

interface UserModel {
    username: string
    displayName?: string
    role: string
}

class UserSearchModel extends BaseSearchModel {
    username: string
    displayName: string
}

export const ListUser: FC = () => {
    const [params, setParams] = useState<UserSearchModel>({
        ...new UserSearchModel(),
    })

    const columns: ColumnDef<UserModel>[] = useMemo(() => {
        const res: ColumnDef<UserModel>[] = [
            {
                accessorKey: 'username',
                header: ({ column }) => <DataTableColumnHeader column={column} title='Username' />,
                cell: ({ row }) => {
                    return (
                        <div className='flex space-x-2'>
                            <span>{row.getValue('username')}</span>
                        </div>
                    )
                },
            },
            {
                accessorKey: 'role',
                header: ({ column }) => <DataTableColumnHeader column={column} title='Role' />,
                cell: ({ row }) => {
                    return (
                        <div className='flex space-x-2'>
                            <span>{row.getValue('role')}</span>
                        </div>
                    )
                },
            },
            {
                accessorKey: 'displayName',
                header: ({ column }) => <DataTableColumnHeader column={column} title='Display Name' />,
                cell: ({ row }) => {
                    const data = row.original
                    return (
                        <div className='flex space-x-2'>
                            <span>{row.getValue('displayName')}</span>
                        </div>
                    )
                },
            },
            {
                id: 'actions',
                cell: ({ row }) => {
                    return (
                        <div className='flex gap-2'>
                            <DataTableRowActions
                                menus={[
                                    {
                                        label: 'Edit',
                                        action: () => {
                                            console.log('Edit')
                                        },
                                    },
                                    {
                                        label: 'Make a copy',
                                        // action: () => true,
                                        afterDivider: true,
                                    },
                                    {
                                        label: 'Change role',
                                        afterDivider: true,
                                        subs: [
                                            {
                                                label: 'Admin',
                                                action: () => {
                                                    console.log('Admin')
                                                },
                                            },
                                            {
                                                label: 'User',
                                            },
                                        ],
                                    },
                                    {
                                        label: 'Delete',
                                    },
                                ]}
                            />
                        </div>
                    )
                },
            },
        ]
        return res
    }, [])

    const onParamsChange = (params: UserSearchModel) => {
        toast((t) => (
            <div>
                <pre className='mt-2 p-2 rounded-md bg-background'>
                    <code className='text-white'>{JSON.stringify(params, null, 2)}</code>
                </pre>
            </div>
        ))

        setParams(params)
    }

    const filterOptions: DataTableFilter<UserModel>[] = useMemo(() => {
        const filters: DataTableFilter<UserModel>[] = [
            {
                column: 'role',
                title: 'Role',
                options: [
                    {
                        value: 'admin',
                        label: 'Admin',
                    },
                    {
                        value: 'user',
                        label: 'User',
                    },
                ],
            },
        ]

        return filters
    }, [])

    const renderActions = useCallback(() => {
        return <Button>Add User</Button>
    }, [])

    const fakeDataUsers = () => {
        const data = Array.from({ length: 10 }, () => ({
            username: faker.internet.userName(),
            displayName: faker.person.fullName(),
            role: faker.helpers.arrayElement(['admin', 'user']),
        }))

        return data
    }

    return (
        <div className='ListUser w-[1000px]'>
            <DataTable<UserModel, UserSearchModel>
                columns={columns}
                data={fakeDataUsers()}
                total={100}
                onParamsChange={onParamsChange}
                isLoading={false}
                params={params}
                // paginationType='offset'
                renderActions={renderActions}
                filterOptions={filterOptions}
            />
        </div>
    )
}
