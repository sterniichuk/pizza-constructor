export type ToppingInfoType = {
    name: string,
    price: number,
    max: number,
}

export class ToppingInfo {
    public name: string;
    public price: number;
    public max: number;

    constructor(props: ToppingInfoType) {
        this.name = props.name;
        this.price = props.price;
        this.max = props.max;
    }

    public isAvailable(): boolean {
        return this.max > 0;
    }
}

export const defaultToppingInfo: ToppingInfo = new ToppingInfo({
    name: "string",
    price: 0,
    max: 10000000,
})
export type ToppingCategory = {
    name: string;
    toppings: ToppingInfo[];
}

export type ToppingCategoryType = {
    name: string;
    toppings: ToppingInfoType[];
}

export function toDefault(list: string[]): ToppingInfo[] {
    return list.map(x => (new ToppingInfo({...defaultToppingInfo, name: x})));
}

export const tabAsString = ["All", "Vegetables", "Sauces", "Meats", "Cheeses"];
export const tabs: ToppingInfo[] = toDefault(tabAsString);
export const fakeToppings: ToppingInfoType[] = [
    {name: "Cheddar", price: 20, max: -1},
    {name: "Brie", price: 300, max: -1},
    {name: "Mozzarella", price: 500, max: -1},
    {name: "Parmesan", price: 2, max: -1},
    {name: "Gouda", price: 10, max: -1},
    {name: "Feta", price: 3, max: -1}
];
export const fakeToppingCategories: ToppingCategory[] = tabs.slice(1).map((tab, index) => {
    const fakeToppingsForTab: ToppingInfo[] = fakeToppings.map(x => {
        const props: ToppingInfoType = {...x, name: x.name + index};
        return new ToppingInfo(props);
    });
    const category: ToppingCategory = {name: tab.name, toppings: fakeToppingsForTab};
    return category;
});