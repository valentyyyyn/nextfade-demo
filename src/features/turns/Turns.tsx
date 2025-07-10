import { useState } from "react";
import type { ReactNode } from "react";
import type { Turn } from "../../hooks/useAvailableTurns";
import useAvailableTurns from "../../hooks/useAvailableTurns";
import TurnCard from "./components/TurnCard";
import ReserveTurnModal from "./components/ReserveTurnModal"; 
import styles from "./Turns.module.css";

export default function Turns() {

    const { turns, loading, error, refetch } = useAvailableTurns();

    const preRenderMessages = (): ReactNode => {

        if (loading) {
            return <span className={styles.turns__loading}>Cargando turnos...</span>;
        }
        if (error) {
            return <span className={styles.turns__error}>Error al cargar los turnos, intentelo más tarde.</span>;
        }
        if (!loading && !error && turns.length === 0) {
            return <span className={styles.turns__loading}>No hay turnos disponibles en este momento.</span>;
        }

        return null;
    }

    const [selectedTurn, setSelectedTurn] = useState<Turn | null>(null);

    const handleTurnClick = (turn: Turn) => {
        if (turn.status !== "Reservado") {
            setSelectedTurn(turn);
        }
    };

    const closeModal = () => {
        setSelectedTurn(null);
    };

    const handleReserveSuccess = () => {
        closeModal();
        refetch(); 
    };

    return (
        
        <section className={styles.turns__sections} aria-live="polite" aria-busy={loading}>

            <video
                className={styles.turns__background_video}
                src="/background-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
            />

            {
                (loading || error || turns.length === 0) && preRenderMessages()
            }

            {
                !loading && !error && turns.length > 0 && (

                    <div className={styles.turns__content_container}>

                        <h2>Turnos Disponibles</h2>

                        <div className={styles.turns__cards_grid}>

                            {
                                turns.map((turn: Turn) => (
                                    <TurnCard key={turn.id} turn={turn} onClick={() => handleTurnClick(turn)}/>
                                ))

                            }

                        </div>

                    </div>
                )
            }

            {
                selectedTurn && (

                    <div className={styles.modal_overlay}>

                        <ReserveTurnModal
                            turn={selectedTurn}
                            onClose={closeModal}
                            onSuccess={handleReserveSuccess} 
                        />

                    </div>
                )
            }

        </section>              
    )
}
