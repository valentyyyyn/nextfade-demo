import { useState, type FormEvent, useEffect } from "react";
import useUploadImage from "../../../hooks/useUploadImage";
import styles from "./AdminUploadImage.module.css";

export default function AdminUploadImage() {
    const { uploadImage, loading, error, success, reset } = useUploadImage();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [clientError, setClientError] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const validateFile = (file: File) => {
        const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

        if (!validExtensions.includes(file.type)) {
            return 'Extensión de archivo no válida. Solo se permiten .jpg, .jpeg, .png';
        }

        if (file.size > maxSizeInBytes) {
            return 'El archivo es demasiado grande. El tamaño máximo es de 5MB.';
        }

        return null;
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const validationError = validateFile(file);
            if (validationError) {
                setClientError(validationError);
                setSelectedFile(null);
                setPreviewUrl(null);
            } else {
                setClientError(null);
                setSelectedFile(file);
                setPreviewUrl(URL.createObjectURL(file));
            }
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedFile) {
            await uploadImage(selectedFile);
        }
    };

    const handleReset = () => {
        reset();
        setSelectedFile(null);
        setPreviewUrl(null);
        setClientError(null);
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (input) {
            input.value = '';
        }
    }
    
    if (success) {
        return (
            <div className={styles.container} role="alert" aria-live="polite">
                <h3>¡Imagen subida con éxito!</h3>
                <button 
                    onClick={handleReset} 
                    className={styles.button}
                    aria-label="Subir otra imagen"
                >
                    Subir otra imagen
                </button>
            </div>
        )
    }

    return (

        <section className={styles.container} aria-labelledby="upload-heading">

            {
                previewUrl && !loading && (
                    <div className={styles.preview__container}>
                        <img src={previewUrl} alt="Vista previa" className={styles.preview} />
                    </div>
                )
            }
            
            <form onSubmit={handleSubmit} className={styles.form}>

                <div className={styles.input__container}>

                    <input 
                        id="file-upload"
                        type="file" 
                        onChange={handleFileChange} 
                        accept="image/png, image/jpeg, image/jpg"
                        className={styles.input__file}
                        aria-describedby="file-format-hint"
                    />

                    <p id="file-format-hint" className={styles.hint}>
                        Formatos aceptados: JPG, JPEG PNG. Tamaño máximo: 5MB
                    </p>

                </div>

                <button 
                    type="submit" 
                    disabled={!selectedFile || loading}
                    className={styles.button}
                    aria-disabled={!selectedFile || loading}
                    aria-label={loading ? 'Subiendo imagen, por favor espere' : 'Subir imagen'}
                >
                    {loading ? 'Subiendo...' : 'Subir'}
                </button>

            </form>
            
            {clientError && (
                <p className={styles.error} role="alert" aria-live="assertive">
                    {clientError}
                </p>
            )}
            {error && (
                <p className={styles.error} role="alert" aria-live="assertive">
                    Error al subir la imagen: {error.message}
                </p>
            )}

        </section>
    );
}
