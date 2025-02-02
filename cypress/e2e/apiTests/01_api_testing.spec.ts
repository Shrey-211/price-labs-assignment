// cypress/e2e/api/apiTests.cy.js

describe.skip('API Testing Suite', () => {
    // Base URL configuration
    const baseUrl = Cypress.env('apiUrl') || 'https://api.your-service.com'

    beforeEach(() => {
    // Common setup before each test
    cy.request({
        method: 'POST',
        url: `${baseUrl}/auth/login`,
        body: {
        username: Cypress.env('username'),
        password: Cypress.env('password')
        }
    }).then((response) => {
        // Store the token for subsequent requests
        window.localStorage.setItem('token', response.body.token)
    })
    })

describe('GET Endpoints', () => {
    it('should successfully fetch user data', () => {
        cy.request({
        method: 'GET',
        url: `${baseUrl}/users`,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
        }).then((response) => {
        // Status code assertion
        expect(response.status).to.eq(200)
        
        // Response body assertions
        expect(response.body).to.have.property('data')
        expect(response.body.data).to.be.an('array')
        
        // Schema validation
        response.body.data.forEach((user) => {
            expect(user).to.have.all.keys('id', 'name', 'email')
        })
        
        // Response time assertion
        expect(response.duration).to.be.lessThan(1000)
        })
    })
    })

describe('POST Endpoints', () => {
    it('should create a new resource', () => {
        const payload = {
        name: 'Test User',
        email: 'test@example.com'
        }

        cy.request({
        method: 'POST',
        url: `${baseUrl}/users`,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
        body: payload
        }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.include(payload)
        })
    })
    })

describe('PUT Endpoints', () => {
    it('should update an existing resource', () => {
        const updatePayload = {
        name: 'Updated Name'
        }

        cy.request({
        method: 'PUT',
        url: `${baseUrl}/users/1`,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
        body: updatePayload
        }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.eq(updatePayload.name)
        })
    })
    })

describe('DELETE Endpoints', () => {
    it('should delete a resource', () => {
        cy.request({
        method: 'DELETE',
        url: `${baseUrl}/users/1`,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
        }).then((response) => {
        expect(response.status).to.eq(204)
        })
    })
    })

describe('Error Handling', () => {
    it('should handle 404 not found', () => {
        cy.request({
        method: 'GET',
        url: `${baseUrl}/nonexistent`,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
        failOnStatusCode: false
        }).then((response) => {
        expect(response.status).to.eq(404)
        })
    })

    it('should handle 400 bad request', () => {
        cy.request({
        method: 'POST',
        url: `${baseUrl}/users`,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
        body: {},  // Empty body to trigger validation error
        failOnStatusCode: false
        }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('error')
        })
    })
    })

describe('Performance Testing', () => {
    it('should respond within acceptable time', () => {
        cy.request({
        method: 'GET',
        url: `${baseUrl}/users`,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
        }).then((response) => {
        expect(response.duration).to.be.lessThan(1000) // 1 second
        })
    })
    })
})