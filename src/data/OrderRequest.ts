export type OrderRequest = {
    clientId: number
    size: string;
    dough: string;
    toppings: string[];
}
export type OrderResponse = {
    clientId: number;
    orderId: number;
    cartSum: number;
};

export enum OrderState {
    RECEIVED, COOKING, DONE, DELIVERING, DELIVERED
}

export type Order = {
    orderId: number,
    price: number,
    amount: number
    isPaid: number
    state: OrderState
    data: OrderDetails
}

export type OrderDetails = {
    size: string;
    dough: string;
    toppings: string[];
}

export type CartResponse = {
    clientId: number;
    cartSum: number;
    orders: Order[]
}

export const defaultCart:CartResponse = {
    clientId:-1,
    cartSum: 0,
    orders: [],
}


