import { useState, useEffect, useCallback } from 'react'; 

export interface Turn {
  id: number;
  dateTime: string;
  name: string;
  whatsApp: string;
  status: string;
}

interface UseAvailableTurnsResult {
    turns: Turn[];
    loading: boolean;
    error: Error | null;
    refetch: () => void; 
}

export default function useAvailableTurns(): UseAvailableTurnsResult {

    const [turns, setTurns] = useState<Turn[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [refreshIndex, setRefreshIndex] = useState(0); 

    const fetchTurns = useCallback(async (signal: AbortSignal) => {
        setLoading(true);
        setError(null);

        const API_URL = `${import.meta.env.VITE_API_URL}/turns`;

        try {
            const response = await fetch(API_URL, { signal });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al cargar los turnos: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data: Turn[] = await response.json();
            setTurns(data);

        } 
        catch (err) {
            if (err instanceof Error && err.name === 'AbortError') {
                console.log('Fetch aborted'); 
            } else {
                console.error('Error fetching turns:', err);
                setError(err as Error); 
            }
        } 
        finally {
            if (!signal.aborted) {
                setLoading(false); 
            }
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetchTurns(signal); 

        return () => {
            controller.abort();
        };
    }, [fetchTurns, refreshIndex]); 

    const refetch = () => {
        setRefreshIndex(prevIndex => prevIndex + 1);
    };


    return { turns, loading, error, refetch }; 
};
