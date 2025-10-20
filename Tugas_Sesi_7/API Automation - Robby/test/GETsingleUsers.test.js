const request = require('supertest')
const chai = require('chai')
const expect = chai.expect

const baseUrl = 'https://reqres.in'

describe('GET Single Users API', () => {
    it('should return of single user', async () => {
        let response = await request(baseUrl).get('/api/users/2')
        console.log('Status code:', response.status)
        console.log('Response body:', JSON.stringify(response.status, null, 2))

        console.log(response.body)
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('data')
        expect(response.body.data).to.be.an('object')
    })
})