export type DataTableFilter<TData> = {
  column?: keyof TData;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
};
