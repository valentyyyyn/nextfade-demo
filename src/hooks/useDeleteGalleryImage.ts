import { useState, useCallback } from 'react';

interface UseDeleteGalleryImageResult {
    deleteImage: (id: number) => Promise<boolean>;
    loading: boolean;
    error: Error | null;
}

export default function useDeleteGalleryImage(): UseDeleteGalleryImageResult {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const deleteImage = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);

        const API_URL = `${import.meta.env.VITE_API_URL}/gallery/${id}`;

        try {
            const response = await fetch(API_URL, {
                method: 'DELETE',
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
            console.error('Error al eliminar la imagen:', err);
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error('Ocurrió un error inesperado al eliminar la imagen.'));
            }
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    return { deleteImage, loading, error };
}