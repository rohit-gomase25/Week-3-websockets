import { useEffect, useRef} from 'react';
import  {useStore} from '../stores/useStockStore';
import type { Stock } from '../types/types';
 
const SERVER_URL = 'ws://localhost:8080';
 
export const useWebSocket = () => {
    const wsRef = useRef<WebSocket | null>(null);
    const retryCountref = useRef<number>(0);
    const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { setStock, setConnected } = useStore();

    function getWaitTime(): number {
        const seconds = Math.pow(2, retryCountref.current);
        return Math.min(seconds, 30) * 1000;
    }

    // 1. Define the function
    function connect() {
        console.log(`Connection to ${SERVER_URL}...`);
        const ws = new WebSocket(SERVER_URL);
        wsRef.current = ws;

        ws.onopen = () => {
            setConnected(true);
            retryCountref.current = 0;
        };

        ws.onmessage = (event: MessageEvent) => {
  try {
    const msg = JSON.parse(event.data);

    // 1. Handle both the initial SNAPSHOT and the live QUOTE updates
    if (msg.type === "SNAPSHOT" || msg.type === "QUOTE") {
      
      // 2. Extract data. In QUOTES, msg.data contains the new ltp/change
      const rawData = msg.data;

      if (rawData) {
        const formattedStock: Stock = {
          ...rawData,
          // Ensure the symbol is present (it's often at the msg level, not data level)
          symbol: msg.symbol || rawData.symbol, 
          // Map 'ltp' from server to 'price' for your UI
          price: rawData.ltp, 
          // Ensure change is mapped so formatChange doesn't crash
          change: rawData.change,
        };

        setStock(formattedStock);
      }
    }

    if (msg.type === "CONNECTED") {
      console.log("Feed Active:", msg.message);
    }
  } catch (err) {
    console.error("Parse error:", err);
  }
};


        ws.onclose = () => {
            setConnected(false);
            const waitTime = getWaitTime();
            retryCountref.current += 1;
            console.log(`Retrying connection in ${waitTime / 1000} seconds...`);
            retryTimerRef.current = setTimeout(connect, waitTime);
        };

        ws.onerror = () => {
            console.log("WebSocket error - server may be offline");
        };
    } // <--- CLOSE connect() HERE

    // 2. Trigger the function inside useEffect
    useEffect(() => {
        connect();
        
        return () => {
            if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
            if (wsRef.current) {
                // Remove listener to prevent the retry loop during unmount
                wsRef.current.onclose = null; 
                wsRef.current.close();
            }
        };
    }, []); // Empty dependency array means this runs once on mount
};