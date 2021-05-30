export interface CustomerDto {
    id: number;
    name: string;
    birthdate: string;
    address: string;
    district: string;
    city: string;
    phone: string;
    email: string;
    document: string;
}

export interface CustomersResponse {
    itens: CustomerDto[];
}
