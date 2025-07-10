export default function formatDateTime(dateTimeString: string) {   
    const date = new Date(dateTimeString);
    const optionsDate: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };

    const formattedDate = date.toLocaleDateString('es-ES', optionsDate);
    const formattedTime = date.toLocaleTimeString('es-ES', optionsTime);

    return { formattedDate, formattedTime };
}