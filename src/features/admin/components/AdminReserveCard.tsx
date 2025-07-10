import { useState, useEffect } from "react";
import styles from "./AdminReserveCard.module.css";
import type { Turn } from "../../../hooks/useAvailableTurns";
import useReserveTurn from "../../../hooks/useReserveTurn";
import formatDateTime from "../../../utils/date";

interface AdminReserveCardProps {
    turn: Turn;
    onTurnReserved: () => void;
}

export default function AdminReserveCard({ turn, onTurnReserved }: AdminReserveCardProps) {
    const [name, setName] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const { reserveTurn, loading, error, success } = useReserveTurn();

    useEffect(() => {
        if (success) {
            setShowSuccess(true);
            onTurnReserved();

            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success, onTurnReserved]);

    const { formattedDate, formattedTime } = formatDateTime(turn.dateTime);

    const handleReserveClick = async () => {
        if (name.trim() === "" || whatsapp.trim() === "") {
            return;
        }
        await reserveTurn(turn.id, name, whatsapp);
    };

    return (
        <section className={styles.admin__reserve__card} role="form" aria-label="Formulario de reserva de turno">

            <div className={styles.admin__reserve__card__header}>
                <span className={styles.admin__reserve__card__date}>{formattedDate}</span>
                <span className={styles.admin__reserve__card__time}>{formattedTime}</span>
            </div>

            <div className={styles.admin__reserve__card__details}>

                <div className={styles.admin__reserve__card__input__container}>
                    <img 
                        src="/user-icon.svg" 
                        alt="" 
                        className={styles.admin__reserve__card__input__icon}
                        aria-hidden="true"
                    />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre"
                        className={styles.admin__reserve__card__contact__input}
                    />
                </div>

                <div className={styles.admin__reserve__card__input__container}>
                    <img 
                        src="/whatsapp-icon.svg" 
                        alt="" 
                        className={styles.admin__reserve__card__input__icon}
                        aria-hidden="true"
                    />
                    <input
                        type="text"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="WhatsApp"
                        className={styles.admin__reserve__card__contact__input}
                        aria-label="Ingrese su número de WhatsApp"
                        aria-required="true"
                    />
                </div>

            </div>

            <div className={styles.admin__reserve__card__actions}>

                <button
                    onClick={handleReserveClick}
                    className={styles.admin__reserve__card__reserve__button}
                    disabled={loading || name.trim() === "" || whatsapp.trim() === ""}
                    aria-disabled={loading || name.trim() === "" || whatsapp.trim() === ""}
                    aria-label={loading ? 'Creando turno...' : 'Crear turno'}
                >
                    {loading ? 'Creando...' : 'Crear'}
                </button>

            </div>

            {
                error && (
                    <p 
                        className={styles.admin__reserve__card__error__message}
                        role="alert"
                        aria-live="assertive"
                    >
                        Error: {error.message}
                    </p>
                )
            }
            {
                showSuccess && (
                    <p 
                    className={styles.admin__reserve__card__success__message}
                    role="status"
                    aria-live="polite"
                    >
                        Turno creado.
                    </p>
                )
            }

        </section>
    );
}
