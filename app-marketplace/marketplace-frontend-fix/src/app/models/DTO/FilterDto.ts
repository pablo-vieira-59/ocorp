export interface Paging{
    page :number;
    itemsPerPage :number;
    orderBy :string | null;
    descending :boolean;
}

export interface SearchField{
    property :string;
    value :any;
    operator :string;
}

export interface FilterDto{
    paging :Paging;
    searchFields :SearchField[];
}