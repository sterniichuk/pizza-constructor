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
    cartSum: number;
    orders: Order[]
}

export type CalculateWithDeliveryResponse = {
    goodsPrice: number,
    totalSum: number
}
export const defaultSum: CalculateWithDeliveryResponse = {
    goodsPrice: 0,
    totalSum: 0
}


export const defaultCart:CartResponse = {
    cartSum: 0,
    orders: [],
}


