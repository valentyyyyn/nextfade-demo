import { useState, useCallback } from 'react';

interface UseCancelTurnResult {
    cancelTurn: (id: number) => Promise<boolean>;
    loading: boolean;
    error: Error | null;
}

export default function useCancelTurn(): UseCancelTurnResult {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const cancelTurn = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);

        const API_URL = `${import.meta.env.VITE_API_URL}/api/turns/${id}/cancelar`;

        try {
            const response = await fetch(API_URL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Error ${response.status}: ${response.statusText}`);
            }
            return true;
        } catch (err) {
            console.error('Error cancelling turn:', err);
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error('Ocurrió un error inesperado al cancelar el turno.'));
            }
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    return { cancelTurn, loading, error };
}
