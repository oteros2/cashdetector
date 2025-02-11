import { useEffect, useState } from 'react';

// Hook para manejar la comunicación con un servidor WebSocket
const useWebSocket = (url: string, navigation : any) => {
  // Estado para almacenar la conexión WebSocket
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // Estado para manejar la informacion 
  const [data, setdata] = useState<string | null>(null);

  useEffect(() => {
    // Crear la conexión WebSocket
    const ws = new WebSocket(url);

    // Manejar eventos
    ws.onmessage = (event) => setdata(event.data);
    ws.onerror = (error) => navigation.navigate('error');


    // Guardar la conexión en el estado
    setSocket(ws);

    return () => {
      // Cerrar la conexión al desmontar el componente
      ws.close();
    };
  }, [url]);

  // Función para enviar datos
  const sendData = (data: ArrayBufferLike) => {
    // Consultar si la conexión WebSocket está abierta
    if (socket && socket.readyState === WebSocket.OPEN) {
      // Convertir el ArrayBuffer a Uint8Array y enviar al servidor
      const uint8Array = new Uint8Array(data);  
      socket.send(uint8Array.buffer); 
    }
  };
  return { data, sendData };
};

export default useWebSocket;
