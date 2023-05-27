import {OrderRequest} from "./OrderRequest";
import {Address} from "./Address";

enum DeliveryType{
    Delivery, CarryOut
}

export type CartData = {
    clientId : number;
    phoneNumber : number;
    deliveryType : DeliveryType;
    deliveryIsPaid : number;
    orders : OrderRequest[];
    clientAddress : Address;
    goodsSum : number;
    totalSum : number;
}