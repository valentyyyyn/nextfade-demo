import { useState } from "react";
import styles from "./AdminCancelCard.module.css";
import type { Turn } from "../../../hooks/useAvailableTurns";
import ConfirmCancelModal from "./ConfirmCancelModal";
import formatDateTime from "../../../utils/date";

interface AdminCancelCardProps {
    turn: Turn;
    onCancel: (turnId: number) => void;
}

export default function AdminCancelCard({ turn, onCancel }: AdminCancelCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isReserved = turn.status === "Reservado";
    const { formattedDate, formattedTime } = formatDateTime(turn.dateTime);

    const handleCancel = () => {
        setIsModalOpen(true);
    };

    const handleConfirmCancel = () => {
        onCancel(turn.id);
        setIsModalOpen(false);
    };

    return (
        
        <section 
            className={`${styles.admin__cancel__card} ${isReserved ? styles.admin__cancel__card__reserved : ''}`}
            aria-labelledby={`turn-${turn.id}-header`}
            aria-describedby={isReserved ? `turn-${turn.id}-details` : undefined}
            role="region"
        >

            <div className={styles.admin__cancel__header} id={`turn-${turn.id}-header`}>
                <span className={styles.admin__cancel__date} aria-label={`Fecha: ${formattedDate}`}>
                    {formattedDate}
                </span>
                <span className={styles.admin__cancel__time} aria-label={`Hora: ${formattedTime}`}>
                    {formattedTime}
                </span>
            </div>
            
            {
                isReserved && turn.name && (
                    <section 
                        className={styles.admin__cancel__details}
                        id={`turn-${turn.id}-details`}
                        aria-label="Detalles del turno"
                    >

                        <div className={styles.admin__cancel__contact}>
                            <h4>Nombre</h4>
                            <p>{turn.name}</p>
                        </div>
                        <div className={styles.admin__cancel__contact}>
                            <h4>Contacto</h4>
                            <p>{turn.whatsApp}</p>
                        </div>

                    </section>
                )
            }

            <div className={styles.admin__cancel__actions}>

                {
                    isReserved && (
                        <button 
                            onClick={handleCancel}
                            className={styles.admin__cancel__cancel__button}
                            aria-label={`Cancelar turno de ${turn.name || 'cliente'}`}
                            aria-haspopup="dialog"
                        >
                            Cancelar Turno
                        </button>
                    )
                }
                
            </div>

            <ConfirmCancelModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmCancel}
                message="¿vos estas seguro pepe?"
                cancelText="depende"
                confirmText="cancelalo altoke"
            />

        </section>
    );
}
