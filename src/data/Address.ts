export type Address = {
    city : string;
    street : string;
    houseNumber : string;
    apartment : string;
    entrance : string;
    floor : string;
    codeToHouse : string;
}
export const defaultAddress : Address = {
    city : "Rivne",
    street : "",
    houseNumber : "",
    apartment : "",
    entrance : "",
    floor : "",
    codeToHouse : "",
}