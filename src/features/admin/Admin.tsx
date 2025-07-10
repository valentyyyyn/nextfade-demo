import useAvailableTurns from '../../hooks/useAvailableTurns';
import AdminCancelCard from './components/AdminCancelCard';
import AdminReserveCard from './components/AdminReserveCard';
import AdminUploadImage from './components/AdminUploadImage';
import useCancelTurn from '../../hooks/useCancelTurn';
import AdminGallery from './components/AdminGallery';
import styles from './Admin.module.css';

export default function Admin() {
    const { turns, loading, error, refetch } = useAvailableTurns();
    const { cancelTurn, loading: canceling, error: cancelError } = useCancelTurn();

    const handleCancelTurn = async (turnId: number) => {
        const success = await cancelTurn(turnId);
        if (success) {            
            refetch();
        }
    };

    const handleTurnReserved = () => {
        refetch();
    };

    return (

        <section className={styles.admin__sections} role="main">

            <video
                className={styles.admin__background__video}
                src="/background-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
            />

            <div className={styles.admin__content__container}>

                <h1 id="admin-heading">Panel de Admin</h1>
                
                <div aria-live="polite" aria-busy={loading || canceling}>
                    {loading && <p className={styles.admin__loading} role="status">Cargando turnos...</p>}
                    {canceling && <p className={styles.admin__loading} role="status">Cancelando turno...</p>}
                    {error && <p className={styles.admin__error} role="alert">Error al cargar los turnos, intentelo más tarde.</p>}
                    {cancelError && <p className={styles.admin__error} role="alert">Error al cancelar el turno, intentelo más tarde.</p>}
                </div>

                
                {!loading && !error && (
                    <div className={styles.admin__turns__container}>

                        <section aria-labelledby="turnos-disponibles" className={styles.admin__turns__section}>
                            <h2 id="turnos-disponibles" className={styles.admin__section__title}>Turnos Disponibles</h2>

                            <div className={styles.admin__turns__grid}>

                                {
                                    turns.filter(turn => turn.status === 'Disponible').length > 0 ?                                     
                                    (
                                        turns.filter(turn => turn.status === 'Disponible').map((turn) => (
                                            <AdminReserveCard
                                                key={turn.id}
                                                turn={turn}
                                                onTurnReserved={handleTurnReserved}
                                            />
                                        ))
                                    ) : 
                                    (
                                        <p className={styles.admin__empty} aria-live="polite">No hay turnos disponibles para reservar.</p>
                                    )
                                }

                            </div>

                        </section>

                        <div className={styles.admin__right__column} aria-label="Acciones de administración">

                            <section aria-labelledby="turnos-reservados" className={styles.admin__turns__section}>
                                <h2 id="turnos-reservados" className={styles.admin__section__title}>Turnos Reservados</h2>

                                <div className={styles.admin__turns__grid}>

                                    {
                                        turns.filter(turn => turn.status === 'Reservado').length > 0 ? 
                                        (
                                            turns.filter(turn => turn.status === 'Reservado').map((turn) => (
                                                <AdminCancelCard
                                                    key={turn.id}
                                                    turn={turn}
                                                    onCancel={handleCancelTurn}
                                                />
                                            ))
                                        ) : 
                                        (
                                            <p className={styles.admin__empty} aria-live="polite">No hay turnos reservados actualmente.</p>
                                        )
                                    }

                                </div>

                            </section>

                            <section aria-labelledby="subir-corte" className={styles.admin__turns__section}>
                                <h2 id="subir-corte" className={styles.admin__section__title}>Subir corte</h2>
                                <AdminUploadImage />
                            </section>

                            <section aria-labelledby="eliminar-corte" className={styles.admin__turns__section}>
                                <h2 id="eliminar-corte" className={styles.admin__section__title}>Eliminar corte</h2>
                                <AdminGallery />
                            </section>

                        </div>

                    </div>
                )}

            </div>
            
        </section>
    );
}