export type Address = {
    city: string;
    street: string;
    houseNumber: string;
    apartment: string;
    entrance: string;
    floor: string;
    codeToHouse: string;
}

export type LocationCity = {
    city: string
    addresses: string[]
}
export type RestaurantLocation = {
    city: string
    street: string
}
export const defaultLocation1: LocationCity = {
    city: "Rivne",
    addresses: ["Kyivska street, 18А"]
}
export const defaultLocation2: LocationCity = {
    city: "Kyiv",
    addresses: ["Rivnenska street, 22B"]
}

export const defaultLocations: LocationCity[] = [defaultLocation1, defaultLocation2];

export const defaultAddress: Address = {
    city: "Rivne",
    street: "",
    houseNumber: "",
    apartment: "",
    entrance: "",
    floor: "",
    codeToHouse: "",
}