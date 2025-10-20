const request = require('supertest')
const chai = require('chai')
const expect = chai.expect

const baseUrl = 'https://reqres.in'

describe('POST Create User API', () => {
    it('should create a new user successfully', async () => {
        const payload = {
            name: 'Robby',
            job: 'Backend QA'
        }

        const response = await request(baseUrl)
            .post('/api/users')
            .set('x-api-key', 'reqres-free-v1')
            .send(payload)

        console.log('Status code:', response.status);
        console.log('Response body:', JSON.stringify(response.body, null, 2))

        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('name', payload.name)
        expect(response.body).to.have.property('job', payload.job)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('createdAt')
    })
})