const request = require('supertest')
const { expect } = require('chai')

const baseUrl = 'https://reqres.in'

describe('PATCH Update User API', () => {
    it('should update user data successfully', async () => {
        let response = await request(baseUrl)
            .patch('/api/users/2')
            .set('x-api-key', 'reqres-free-v1')
            .send({
                job: 'Backend Developer'
            })

        console.log('Status code:', response.status)
        console.log('Response body:', JSON.stringify(response.body, null, 2))

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('job', 'Backend Developer')
        expect(response.body).to.have.property('updatedAt')
    })
})