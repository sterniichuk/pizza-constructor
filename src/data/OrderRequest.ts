export type OrderRequest = {
    size: string;
    dough: string;
    toppings: string[];
}
export type OrderResponse = {
    orderId: number;
    cartSum: number;
};

export enum OrderState {
    STORED = 1,
    COOKING = 2,
    COOKING_DONE = 3,
    DELIVERING = 4,
    WAITING_FOR_CLIENT = 5,
    DELIVERED = 6,
    ORDER_DONE = 7
}

export type Order = {
    orderId: number,
    price: number,
    amount: number
    paid: number
    state: OrderState
    data: OrderDetails
}

export type OrderDetails = {
    size: string;
    dough: string;
    toppings: string[];
}

export type CartResponse = {
    cartSum: number;
    orders: Order[]
}

export type TimeToWaitResponse = {
    seconds: number
    cart: CartResponse
}


export type CalculateWithDeliveryResponse = {
    goodsPrice: number,
    totalSum: number
}
export const defaultSum: CalculateWithDeliveryResponse = {
    goodsPrice: 0,
    totalSum: 0
}


export const defaultCart: CartResponse = {
    cartSum: 0,
    orders: [],
}


export const defaultTimeToWaitResponse = {
    seconds: 0,
    cart: defaultCart
}