export type HeaderItem = {
  key: string;
  value: string;
  className?: string;
  innerClassName?: string;
};

export type Rows = Record<string, any>[];

export interface SettersEvent {
  setLoading: (value: boolean) => void;
  setData: (value: Rows) => void;
  setTotalItems?: (value: number) => void;
}

export interface PageEvent extends SettersEvent {
  itemsPerPage: number;
  currentPage: number;
}
