import classes from './data-table-spin.module.scss'
import React from 'react'
import { cn } from '@/lib/utils'

type CustomSpinWrapperProps = {
    isLoading?: boolean
    children?: React.ReactNode
    className?: string
    size?: number
}

export const DataTableSpin: React.FC<CustomSpinWrapperProps> = ({ isLoading, children, className, size }) => {
    return (
        <div className={cn('relative', className)}>
            {isLoading && (
                <div className='absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-100'>
                    <svg
                        className={classes.container}
                        viewBox='0 0 40 40'
                        height={size || 40}
                        width={size || 40}
                        style={{
                            ...(!!size ? { width: `${size}px` } : {}),
                        }}
                    >
                        <circle
                            className={classes.track}
                            cx={20}
                            cy={20}
                            r='17.5'
                            pathLength={100}
                            strokeWidth='5px'
                            fill='none'
                        />
                        <circle className={classes.car} cx={20} cy={20} r='17.5' pathLength={100} strokeWidth='5px' fill='none' />
                    </svg>
                </div>
            )}
            <div className={cn({ 'opacity-50 pointer-events-none': isLoading })}>{children}</div>
        </div>
    )
}
