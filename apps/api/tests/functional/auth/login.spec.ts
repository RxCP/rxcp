import { test } from '@japa/runner'

test.group('Auth', () => {
  test('Should be able to login', async ({ client }) => {
    const response = await client.post('/api/login').json({
      email: 'admin@rxcp.com',
      password: 'admin',
    })

    response.assertStatus(200)
  })

  test('Should be able to register', async ({ client }) => {
    const response = await client.post('/api/register').json({
      first_name: 'John',
      last_name: 'Smith',
      email: 'john@example.com',
      password: 'example123',
    })

    response.assertStatus(200)
  })
})
