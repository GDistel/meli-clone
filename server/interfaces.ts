export interface ICategory {
    id: string;
    name: string;
    results: number;
};

export interface IItem {
    id: string;
    title: string;
    price: {
        currency: string;
        amount: number;
        decimals: number;
    },
    picture: string;
    condition: string;
    free_shipping: boolean;
};;