

import { useState, useEffect, useRef } from 'react'
import io, { Socket } from 'socket.io-client'


interface UseSocketReturn {
  socket: Socket | null
  isOnline: boolean
  isConnecting: boolean
}

export const useSocket = (serverUrl: string = 'http://localhost:3001'): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isOnline, setIsOnline] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    // Evitar múltiples conexiones
    if (socketRef.current) return

    console.log('🔌 Iniciando conexión a:', serverUrl)
    setIsConnecting(true)

    // Crear conexión
    const newSocket = io(serverUrl, {
      transports: ['websocket'],
      timeout: 5000,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    })

    // Eventos de conexión
    newSocket.on('connect', () => {
      console.log('🟢 CONECTADO al servidor:', newSocket.id)
      setIsOnline(true)
      setIsConnecting(false)
      
      // Ping de prueba
      newSocket.emit('ping', { 
        message: 'Frontend conectado!',
        timestamp: new Date().toISOString()
      })
    })

    newSocket.on('disconnect', (reason) => {
      console.log('🔴 DESCONECTADO del servidor. Razón:', reason)
      setIsOnline(false)
      setIsConnecting(false)
    })

    newSocket.on('connect_error', (error) => {
      console.error('❌ ERROR de conexión:', error.message)
      setIsOnline(false)
      setIsConnecting(false)
    })

    newSocket.on('reconnect', (attemptNumber) => {
      console.log('🔄 RECONECTADO en intento:', attemptNumber)
      setIsOnline(true)
      setIsConnecting(false)
    })

    newSocket.on('reconnect_attempt', (attemptNumber) => {
      console.log('🔄 Intentando reconectar...', attemptNumber)
      setIsConnecting(true)
    })

    // Eventos personalizados del servidor
    newSocket.on('welcome-message', (data) => {
      console.log('🎉 MENSAJE DEL SERVIDOR:', data)
    })

    newSocket.on('pong', (data) => {
      console.log('🏓 PONG del servidor:', data)
    })

    // Guardar referencias
    setSocket(newSocket)
    socketRef.current = newSocket

    // Cleanup
    return () => {
      console.log('🧹 Limpiando conexión socket...')
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [serverUrl])

  return {
    socket,
    isOnline,
    isConnecting
  }
}

export default useSocket