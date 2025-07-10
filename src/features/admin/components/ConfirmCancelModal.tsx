import styles from './ConfirmCancelModal.module.css';

interface ConfirmCancelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message?: string;
    cancelText?: string;
    confirmText?: string;
}

export default function ConfirmCancelModal({ isOpen, onClose, onConfirm, 
    message = '¿Estás seguro?', 
    cancelText = 'Cancelar',
    confirmText = 'Confirmar' }: ConfirmCancelModalProps) {

    if (!isOpen) {
        return null;
    }

    return (


        <div className={styles.modal__overlay}>

            <div className={styles.modal__content}>

                <p>{message}</p>

                <div className={styles.modal__actions}>
                    <button onClick={onClose} className={styles.cancel__button}>
                        {cancelText}
                    </button>
                    <button onClick={onConfirm} className={styles.confirm__button}>
                        {confirmText}
                    </button>
                </div>

            </div>

        </div>

    );
};

