import styles from "./TurnCard.module.css";
import formatDateTime from "../../../utils/date";
import type { Turn } from "../../../hooks/useAvailableTurns";

interface TurnCardProps {
    turn: Turn;
    onClick?: () => void;
}

export default function TurnCard({ turn, onClick }: TurnCardProps) {
    const isReserved = turn.status === "Reservado";
    const { formattedDate, formattedTime } = formatDateTime(turn.dateTime);

    return (

        <div 
            className={`${styles.turn__item} ${isReserved ? styles.turn__item__reserved : ""}`}
            role="listitem"
            aria-label={`Turno el ${formattedDate} a las ${formattedTime}`}
        >

            <div className={styles.turn__info}>

                <span className={styles.turn__date} aria-hidden="true">
                    {formattedDate}
                </span>
                <span className={styles.turn__time} aria-hidden="true">
                    {formattedTime}
                </span>
                
            </div>

            <button 
                onClick={onClick}
                className={`${styles.reserve__button} ${isReserved ? styles.reserve__button__disabled : ""}`}
                aria-label={isReserved ? 
                    `Turno reservado para el ${formattedDate} a las ${formattedTime}` : 
                    `Reservar turno para el ${formattedDate} a las ${formattedTime}`}
                aria-disabled={isReserved}
            >
                {isReserved ? "Reservado" : "Reservar"}
            </button>
            
        </div>
    );
}