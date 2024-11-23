export interface Category {
    type: string;
    name: string;
}

export interface Categories extends Category {
    id: string;
}

export interface ICategory {
    [id: string]: Category;
}

export interface Transaction {
    category: string;
    amount: string;
    date: string;
}

export interface Transactions extends Transaction {
    id: string;
}

export interface ITransaction {
    [id: string]: Transaction;
}