export type ToppingInfo = {
    name: string;
    price: number;
    isAvailable: boolean;
}
export type ToppingCategory = {
    name: string;
    toppings : ToppingInfo[];
}