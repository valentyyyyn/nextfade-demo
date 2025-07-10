import { useState } from 'react';

interface UseReserveTurnResult {
    reserveTurn: (turnId: number, name: string, whatsapp: string) => Promise<void>;
    loading: boolean;
    error: Error | null;
    success: boolean;
}

export default function useReserveTurn(): UseReserveTurnResult {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const reserveTurn = async (turnId: number, name: string, whatsapp: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const API_URL = `${import.meta.env.VITE_API_URL}/api/turns/${turnId}/reservar`;

        try {
            const response = await fetch(API_URL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, whatsapp }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al reservar el turno: ${response.status} ${response.statusText} - ${errorText}`);
            }

            setSuccess(true);

        } catch (err) {
            console.error('Error reserving turn:', err);
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error('Ocurrió un error inesperado al reservar el turno.'));
            }
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return { reserveTurn, loading, error, success };
}
