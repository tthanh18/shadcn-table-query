'use client'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { isArray } from '@/lib/utils'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Fragment } from 'react'

interface IMenuItem {
    label: string
    action?: () => void
    afterDivider?: boolean
    subs?: IMenuItem[]
}

interface DataTableRowActionsProps<TData> {
    menus: IMenuItem[]
}

export function DataTableRowActions<TData>({ menus = [] }: DataTableRowActionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
                    <DotsHorizontalIcon className='h-4 w-4' />
                    <span className='sr-only'>Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[160px]'>
                {menus.map((menu, index) => {
                    if (isArray(menu.subs)) {
                        return (
                            <Fragment key={index}>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>{menu.label}</DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        {menu.subs.map((subMenu, subIndex) => (
                                            <DropdownMenuItem key={subIndex} onClick={subMenu.action}>
                                                {subMenu.label}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                                {menu?.afterDivider && <DropdownMenuSeparator />}
                            </Fragment>
                        )
                    }

                    return (
                        <Fragment key={index}>
                            <DropdownMenuItem onClick={menu.action}>{menu.label}</DropdownMenuItem>
                            {menu?.afterDivider && <DropdownMenuSeparator />}
                        </Fragment>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
