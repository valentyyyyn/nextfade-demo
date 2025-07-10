import styles from "./ReserveTurnModal.module.css";
import { useState, useEffect } from "react";
import type { Turn } from "../../../hooks/useAvailableTurns";
import useReserveTurn from "../../../hooks/useReserveTurn";
import formatDateTime from "../../../utils/date";

interface ReserveTurnModalProps {
    turn: Turn;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ReserveTurnModal({ turn, onClose, onSuccess }: ReserveTurnModalProps) {
    const [name, setName] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [localError, setLocalError] = useState("");
    const { reserveTurn, loading, error, success } = useReserveTurn();
    const { formattedTime } = formatDateTime(turn.dateTime);

    useEffect(() => {

        if (success) {
            const timer = setTimeout(() => {
                onSuccess();
            }, 1000);
            return () => clearTimeout(timer);
        }

    }, [success, onSuccess]);

    const handleSubmit = async () => {

        if (!name.trim()) {
            setLocalError("El nombre no puede estar vacío.");
            return;
        }

        if (!whatsapp.trim()) {
            setLocalError("El whatsapp no puede estar vacío.");
            return;
        }

        setLocalError("");
        await reserveTurn(turn.id, name, whatsapp);
    }


    const buttonText = loading ? "Confirmando..." : (success ? "¡Reservado!" : "Confirmar");
    const isButtonDisabled = loading || success;

    return (

        <section className={styles.reserve__modal}>

            <h2 className={styles.reserve__modal__title}>Confirmar reserva</h2>
            <p className={styles.reserve__modal__time}>Turno para las {formattedTime}</p>

            <div className={styles.input__container}>

                <img 
                    src="/user-icon.svg" 
                    alt="Icono de usuario" 
                    className={styles.input__icon}
                />
                <input
                    className={styles.reserve__modal__input}
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading || success}
                    required
                />

            </div>

            <div className={styles.input__container}>

                <img 
                    src="/whatsapp-icon.svg" 
                    alt="Icono de WhatsApp" 
                    className={styles.input__icon}
                />
                <input
                    className={styles.reserve__modal__input}
                    type="text"
                    placeholder="Tu whatsapp"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    disabled={loading || success}
                    required
                />
                
            </div>

            {(localError || error) && <span className={styles.reserve__modal__error}>{localError || error?.message}</span>}
            {success && <span className={styles.reserve__modal__success}>¡Turno reservado con éxito!</span>}

            <div className={styles.reserve__modal__buttons}>

                <button
                    className={styles.reserve__modal__button + " " + (success ? styles.reserve__modal__button__success : '')}
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}
                >
                    {buttonText}
                </button>
                {!loading && !success && (
                     <button className={styles.reserve__modal__button} onClick={onClose}>Cancelar</button>
                )}

            </div>

        </section>
        
    );
}
