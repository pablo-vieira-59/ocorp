export interface PaginatedResultDTO<T> {
    items: T[];
    totalCount: number;
}