export interface PublicUser {
    name: string;
    id: string;
    email?: string;
    phone?: string;
    address?: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
}
