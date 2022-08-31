/*
|--------------------------------------------------------------------------
| Define HTTP rate limiters
|--------------------------------------------------------------------------
|
| The "Limiter.define" method callback receives an instance of the HTTP
| context you can use to customize the allowed requests and duration
| based upon the user of the request.
|
*/

import { Limiter } from '@adonisjs/limiter/build/services'

export const { httpLimiters } = Limiter.define('global', () => {
  console.log('global')
  return Limiter.allowRequests(100).every('1 min')
})
  .define('10reqMin', () => {
    return Limiter.allowRequests(10).every('1 min')
  })
  .define('100reqMin', () => {
    return Limiter.allowRequests(100).every('1 min')
  })
