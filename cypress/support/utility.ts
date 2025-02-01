export class Utility {
    getBaseLoginUrl() {
        return 'https://pricelabs.co/signin';
    }
}

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export enum ApiEndpoints {
    SYNC_PRICES = '/api/sync_prices*'
}