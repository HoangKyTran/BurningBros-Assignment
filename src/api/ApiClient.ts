export abstract class ApiClient {
    domain: string;
    headers: {};
    constructor(headers?: object) {
        this.domain = `https://dummyjson.com`
        this.headers = {
            "Content-Type": "application/json",
            ...headers
        }
    }

    async makeRequest<T>(method: string, url?: string, body?: BodyInit): Promise<T> {
        const response = await fetch(this.domain + url, { method, headers: this.headers, body })
        return await response.json()
    }
}