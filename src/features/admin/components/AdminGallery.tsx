import { useState } from 'react';
import useGalleryImages from "../../../hooks/useGalleryImages";
import useDeleteGalleryImage from "../../../hooks/useDeleteGalleryImage";
import ConfirmCancelModal from './ConfirmCancelModal';
import styles from "./AdminGallery.module.css";

export default function AdminGallery() {
    const { images, loading, error, refetch } = useGalleryImages();
    const { deleteImage, loading: deleting, error: deleteError } = useDeleteGalleryImage();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleDeleteClick = (id: number) => {
        setDeletingId(id);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        if (deletingId === null) return;

        const success = await deleteImage(deletingId);
        if (success) {
            await refetch();
        }

        setShowConfirmModal(false);
        setDeletingId(null);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setDeletingId(null);
    };

    if (loading && !images.length) {
        return <div className={styles.loading}>Cargando imágenes...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error al cargar las imágenes: {error.message}</div>;
    }

    if (deleteError) {
        return <div className={styles.error}>Error al eliminar la imagen: {deleteError.message}</div>;
    }

    return (

        <section className={styles.gallery}>

            {
                images.length === 0 ? (
                    <p className={styles.emptyMessage}>
                        No hay cortes en la galería
                    </p>
                ) :
                (
                    <div className={styles.grid}>

                        {
                            images.map((image) => (

                                <div key={image.id} className={styles.imageContainer}>

                                    <div className={styles.imageWrapper}>
                                        <img 
                                            src={image.url} 
                                            alt={`Imagen de galería ${image.id}`}
                                            className={styles.image}
                                            loading="lazy"
                                        />
                                    </div>

                                    <button 
                                        className={styles.deleteButton}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteClick(image.id);
                                        }}
                                        disabled={deleting || deletingId === image.id}
                                        aria-label={`Eliminar imagen ${image.id}`}
                                    >
                                        Eliminar corte
                                    </button>

                                </div>

                            ))
                        }

                    </div>
                )
            }
            
            <ConfirmCancelModal
                isOpen={showConfirmModal}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                message="¿vos estas seguro pepe? un re degrado"
                cancelText="depende"
                confirmText="eliminalo altoke"
            />
            
        </section>
    );
}