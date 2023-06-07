import {OrderRequest} from "./OrderRequest";
import {Address} from "./Address";

export enum DeliveryType {
    Delivery, CarryOut
}

export type CheckoutRequest = {
    phoneNumber: string;
    deliveryType: DeliveryType;
    orders: OrderRequest[];
    clientAddress: Address;
    goodsSum: number;
    totalSum: number;
}

export type ChangeAmountRequest = {
    orderId: number,
    isPositiveChange: boolean
}