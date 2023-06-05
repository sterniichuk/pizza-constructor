import {OrderRequest} from "./OrderRequest";
import {Address} from "./Address";

export enum DeliveryType {
    Delivery, CarryOut
}

export type CartData = {
    clientId: number;
    phoneNumber: number;
    deliveryType: DeliveryType;
    orders: OrderRequest[];
    clientAddress: Address;
    goodsSum: number;
    totalSum: number;
}

export type ChangeAmountRequest = {
    clientId: number;
    orderId: number,
    isPositiveChange: boolean
}