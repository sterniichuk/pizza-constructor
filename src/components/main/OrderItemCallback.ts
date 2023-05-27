export class OrderItemCallback {
    public decrementTopping: () => void
    public setValueTopping: (value: number) => void

    constructor(decrementTopping: () => void, setValueTopping: (value: number) => void) {
        this.decrementTopping = decrementTopping;
        this.setValueTopping = setValueTopping;
    }
}