export class Utility {
    getBaseLoginUrl() {
        return 'https://pricelabs.co/signin';
    }
}

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
}

export enum ApiEndpoints {
    LOGIN = 'https://api.novu.co/v1/widgets/session/initialize',
    ORGANIZATION = 'https://api.novu.co/v1/widgets/organization',
    UNSEEN = 'https://api.novu.co/v1/widgets/notifications/unseen?limit=100',
    UNREAD = 'https://api.novu.co/v1/widgets/notifications/unread?limit=100',
    SYNC_PRICES = '/api/sync_prices*',
    TOGGLE_STATUS = '/api/push_price_status*',
    MULTI_CALENDER_DSO = '/session/initialize',
    ADD_CUSTOM_PRICING = '/api/add_custom_pricing',
    REMOVE_CUSTOM_PRICING = '/api/remove_custom_pricing'
}

export enum Urls {
    MULTI_CALENDAR = '/multicalendar',
    PRICING = '/pricing',
    MANAGE_LISTINGS = '/mappings',
    CUSTOMIZATIONS = '/customization'
}

export enum RequestType {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE'
}