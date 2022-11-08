import io from 'socket.io-client';

const url = import.meta.env.PUBLIC_SOCKET_URL;
const socket = io(url);

export default socket;
