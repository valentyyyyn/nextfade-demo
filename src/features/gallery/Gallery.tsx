import styles from "./Gallery.module.css";
import useGalleryImages from "../../hooks/useGalleryImages";
import GalleryCard from "./components/GalleryCard";

export default function Gallery() {
    const { images, loading, error } = useGalleryImages();
    
    return (

        <section className={styles.gallery} aria-label="Galería de cortes de pelo" aria-busy={loading}>
            
            <div aria-hidden="true">
                <video
                    className={styles.gallery__background__video}
                    src="/background-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                />
            </div>
            
            <h1 className={styles.gallery__title} id="gallery-title">Mis cortes</h1>
            
            {
                loading && (
                    <p className={styles.gallery__loading} aria-live="assertive">
                        Cargando imágenes...
                    </p>
                )
            }
               
            {
                error && (
                    <p className={styles.gallery__error} role="alert" aria-live="assertive">
                        Error al cargar las imágenes, intentelo más tarde.
                    </p>
                )
            }
            
            <div className={styles.gallery__grid} role="region" aria-labelledby="gallery-title">

                {
                    !loading && !error && images.map((image) => (
                        <GalleryCard
                            key={image.id}
                            id={image.id}
                            url={image.url}
                        />
                    ))
                }

            </div>

        </section>
    );
}