
let authToken: string;

beforeEach(() => {
    cy.log('login in to get tokens')
    cy.request({
        method: 'POST',
        url: 'https://api.novu.co/v1/widgets/session/initialize', 
        body: {
            applicationIdentifier: 'jioeUUYx3h8p',
            subscriberId: '123641',
            hmacHash: null
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('token');
            authToken = response.body.data.token;
            cy.log('authToken', authToken);
            cy.log('Response Cookies:', response.headers['set-cookie']);
            expect(response.body.data.token).to.be.a('string');
            expect(response.body.data).to.have.property('profile');
            expect(response.body.data.profile).to.have.property('_id', '6607b4366df43c247adccef5');
            expect(response.body.data.profile).to.have.property('firstName', 'QA');
            expect(response.body.data.profile).to.have.property('lastName', 'Hiring');
           // Check cookies after login
            cy.getCookies().then((cookies) => {
                cy.log('Cookies in Cypress after login: ', cookies);
                cookies.forEach((cookie) => {
                    Cypress.env(cookie.name, cookie.value); // Store cookies in Cypress environment variables
                    cy.log(`cookie Name: ${cookie.name}`);
                    cy.log(`cookie Val: ${cookie.value}`);
                });
            });
        });
});

describe('API Tests', () => {

    it('should successfully fetch organization details', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.novu.co/v1/widgets/organization',
            headers: {
                Authorization: `Bearer ${authToken}`,
                Accept: 'application/json, text/plain, */*'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('_id', '66032532f43359bff28c011f');
            expect(response.body.data).to.have.property('name', 'PriceLabs');
            expect(response.body.data).to.have.property('branding');
            expect(response.body.data.branding).to.have.property('color', '#f47373');
            expect(response.body.data.branding).to.have.property('logo', 'https://s3.us-east-1.amazonaws.com/prod-novu-app-bucket/66032532f43359bff28c011f/66032532f43359bff28c016e/e06eb7414a09434f48bac2cb0273dd0e.png');
            expect(response.body.data.branding).to.have.property('fontFamily', 'inherit');
        });
    });

    it('should successfully fetch unseen', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.novu.co/v1/widgets/notifications/unseen?limit=100',
            headers: {
                Authorization: `Bearer ${authToken}`,
                Accept: 'application/json, text/plain, */*'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('count',0);
        });
    })

    it('should successfully fetch seen', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.novu.co/v1/widgets/notifications/unread?limit=100',
            headers: {
                Authorization: `Bearer ${authToken}`,
                Accept: 'application/json, text/plain, */*'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('count',1);
        });
    })

    it.skip('should successfully update push price status', () => {
        cy.getCookies().then((cookies) => {
            cookies.forEach((cookie) => {
                cy.setCookie(cookie.name, cookie.value); // Set cookies before API request
                cy.log(`cookie Name: ${cookie.name}`);
                cy.log(`cookie Val: ${cookie.value}`);
            });
        });
        cy.request({
            method: 'POST',
            url: `https://app.pricelabs.co/api/push_price_status?${Date.now()}`,
            headers: {
                authorization: `Bearer ${authToken}`,
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: {
                push_status: true,
                listing_id: 'VRMREALTY___206',
                pms_name: 'vrm'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'SUCCESS');
            expect(response.body).to.have.property('response');
            expect(response.body.response).to.have.property('message');
            expect(response.body.response).to.have.property('sync', false);
            expect(response.body.response).to.have.property('ask_feedback', false);
            expect(response.body.response).to.have.property('listing_move_to_new_algo', false);
            expect(response.body.response).to.have.property('listing_name', '.Christian Test 100');
        });
    });

});
