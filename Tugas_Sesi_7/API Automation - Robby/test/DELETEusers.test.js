const request = require('supertest')
const { expect } = require('chai')

const baseUrl = 'https://reqres.in'

describe('DELETE User API', () => {
    it('should delete user successfully', async () => {
        let response = await request(baseUrl)
            .delete('/api/users/2')
            .set('x-api-key', 'reqres-free-v1')

        console.log('Status code:', response.status)

        expect(response.status).to.equal(204)
    })
})