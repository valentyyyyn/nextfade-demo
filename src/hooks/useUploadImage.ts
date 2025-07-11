import { useState } from 'react';

interface UseUploadImageResult {
  uploadImage: (file: File) => Promise<void>;
  loading: boolean;
  error: Error | null;
  success: boolean;
  url: string | null;
  reset: () => void;
}

export default function useUploadImage(): UseUploadImageResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setUrl(null);

    const validExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      setError(new Error('Extensión de archivo no válida. Solo se permiten .jpg, .jpeg, .png'));
      setLoading(false);
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      setError(new Error('El archivo es demasiado grande. El tamaño máximo es de 5MB.'));
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Gallery`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al subir la imagen: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const { url: imageUrl } = await response.json();
      setUrl(imageUrl);
      setSuccess(true);

    } catch (err) {
      console.error('Error uploading image:', err);

      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Ocurrió un error inesperado al subir la imagen.'));
      }

      setSuccess(false);
    } finally {
      setLoading(false);
    }
    
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
    setUrl(null);
  };

  return { uploadImage, loading, error, success, url, reset };
}
