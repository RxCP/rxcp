import { ResponseContract } from '@ioc:Adonis/Core/Response'
import Redis from '@ioc:Adonis/Addons/Redis'

function cacheData(key: string, duration: number = 86400) {
  return (response: ResponseContract) => {
    return async (cb: Function) => {
      let data = {}
      const usersCache = await Redis.get(key)
      const usersCacheObj = JSON.parse(usersCache || '[]')

      if (
        !usersCache ||
        usersCacheObj?.meta?.total <= 0 ||
        usersCacheObj?.data?.length <= 0 ||
        !usersCacheObj?.data
      ) {
        const results = await cb()

        data = results?.serialize()
        await Redis.set(key, JSON.stringify(data), 'EX', duration)
      } else {
        data = JSON.parse(usersCache)
      }

      response.header('x-cache-duration', duration)
      response.header('x-cache-in', 'seconds')

      return data
    }
  }
}

/**
 * Purge single cache
 */
export async function purgeSingleCache(key?: string) {
  if (key) {
    await Redis.del(key)
    return
  }
}

/**
 * Purge all cache
 * @param match String - e.g 'users:*'
 */
export async function purgeCache(match?: string) {
  console.log(match)
  const stream = Redis.scanStream({ match, count: 100 })
  let pipeline = Redis.pipeline()

  stream.on('data', (keys) => {
    stream.pause()

    for (const key of keys) {
      pipeline.del(key)
    }

    pipeline.exec(() => {
      stream.resume()
    })
  })
}

export default cacheData
