import io from 'socket.io-client'

const socket = io(import.meta.env.VITE_SOCKET_SERVER_API_URL)

const socketConnect = () => {
  socket.on('connect', () => {
    console.log('socket client connected 🚀🚀')
  })
}

const socketDisconnect = () => {
  socket.on('disconnect', () => {
    console.log('socket client disconnected ❌❌')
  })
}

const socketOn = (name, callback) => {
  socket.on(name, callback)
}

const socketOff = (name, callback) => {
  socket.off(name, callback)
}

const socketEmit = (name, payload) => {
  socket.emit(name, payload)
}

export { socket, socketConnect, socketDisconnect, socketOn, socketOff, socketEmit }
