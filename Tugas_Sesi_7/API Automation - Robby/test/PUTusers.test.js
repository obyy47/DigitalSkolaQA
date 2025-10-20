const request = require('supertest')
const { expect } = require('chai')

const baseUrl = 'https://reqres.in'

describe('PUT Update User API', () => {
    it('should replace user data successfully', async () => {
        let response = await request(baseUrl)
            .put('/api/users/2')
            .set('x-api-key', 'reqres-free-v1')
            .send({
                name: 'Robby',
                job: 'Fullstack Engineer'
            })

        console.log('Status code:', response.status)
        console.log('Response body:', JSON.stringify(response.body, null, 2))

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('name', 'Robby')
        expect(response.body).to.have.property('job', 'Fullstack Engineer')
        expect(response.body).to.have.property('updatedAt')
    })
})