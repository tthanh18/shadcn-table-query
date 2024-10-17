export class BaseSearchModel {
    page: number = 0
    limit: number = 10
    key: string | null = null
    orderBy: string = ''
    orderType: (typeof ESortType)[keyof typeof ESortType] = ESortType.ASC
    filters: Record<string, string | number | string[]> = {}
}

export enum ESortType  {
    ASC = 'ASC',
    DESC = 'DESC',
}
