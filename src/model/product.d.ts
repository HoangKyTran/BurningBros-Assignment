type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    thumbnail: string;
    images: string[];
};

type GetProductsApiResponse = {
    products: Product[];
    total: number;
    limit: number;
    skip: number;
}