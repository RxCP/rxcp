// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.unauthorized({
        errors: [
          {
            message: 'Invalid credentials',
          },
        ],
      })
    }
  }
}
