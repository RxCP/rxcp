import io from 'socket.io-client'

export default function useSocket() {
  const config = useRuntimeConfig()
  const url: string = config.public.socketUrl
  return io(url)
}
