import { useState, useEffect, useCallback } from "react";
import { type GalleryCardProps } from "../features/gallery/components/GalleryCard";

export default function useGalleryImages() {
    const [images, setImages] = useState<GalleryCardProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchImages = useCallback(async (signal?: AbortSignal) => {
        setLoading(true);
        setError(null);

        const API_URL = `${import.meta.env.VITE_API_URL}/Gallery`;

        try {
            const response = await fetch(API_URL, { signal });
            if (!response.ok) {
                throw new Error('No se pudo cargar la galería');
            }

            const data = await response.json();
            setImages(data);
            return data;
        } 
        catch (err) {
            if (!(err instanceof Error) || err.name !== 'AbortError') {
                console.error('Error al cargar las imágenes:', err);
                setError(err instanceof Error ? err : new Error('Error desconocido'));
            }
            throw err;
        } 
        finally {
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        const controller = new AbortController();
        fetchImages(controller.signal);
        return () => controller.abort();
    }, [fetchImages]);

    useEffect(() => {
        const controller = new AbortController();
        fetchImages(controller.signal);
        return () => controller.abort();
    }, [fetchImages]);

    return { images, loading, error, refetch };
}