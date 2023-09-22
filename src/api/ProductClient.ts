import { encodedParam } from "../utils/ApiRequest";
import { ApiClient } from "./ApiClient";

const prefix = "/products"

class ProductClient extends ApiClient {
    getListProduct(): Promise<GetProductsApiResponse> {
        return this.makeRequest<GetProductsApiResponse>("GET", prefix)
    }

    searchProducts(params?: object): Promise<GetProductsApiResponse> {
        let url = `${prefix}/search`
        if (params) {
            url += encodedParam(params)
        }
        return this.makeRequest<GetProductsApiResponse>("GET", url)
    }
}

export const getProductClient = (): ProductClient => new ProductClient() 