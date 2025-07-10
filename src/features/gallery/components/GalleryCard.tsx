import { useState, useRef, useEffect } from 'react';
import styles from "./GalleryCard.module.css"

export interface GalleryCardProps {
    url: string;
    id: number;
}

export default function GalleryCard({ url, id }: GalleryCardProps) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleImageClick = () => {
        setIsZoomed(true);
        setIsClosing(false);
        document.body.style.overflow = 'hidden';
    };

    const closeZoom = () => {
        if (modalRef.current) {
            setIsClosing(true);
            modalRef.current.addEventListener('animationend', () => {
                setIsZoomed(false);
                document.body.style.overflow = 'unset';
            }, { once: true });
        } else {
            setIsZoomed(false);
            document.body.style.overflow = 'unset';
        }
    };

    return (

        <>
            <div className={styles.galleryCard} role="article" aria-label="Corte de pelo">

                <div 
                    className={styles.galleryCard__image__container}
                    onClick={handleImageClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleImageClick()}
                >
                    <img 
                        src={url} 
                        alt="Corte de pelo"
                        className={styles.galleryCard__image}
                        loading="lazy"
                        aria-describedby={`gallery-image-${id}`}
                    />
                </div>
                
            </div>

            {
                isZoomed && (

                    <div 
                        ref={modalRef}
                        className={`${styles.zoomModal} ${isClosing ? styles.closing : ''}`} 
                        onClick={closeZoom}
                    >
                        
                        <div className={styles.zoomContent} onClick={(e) => e.stopPropagation()}>
                            <button 
                                className={styles.closeButton}
                                onClick={closeZoom}
                                aria-label="Cerrar zoom"
                            >
                                &times;
                            </button>
                            <img 
                                src={url} 
                                alt="Vista ampliada del corte de pelo"
                                className={styles.zoomedImage}
                            />

                        </div>

                    </div>
                )
            }

        </>
    );
}