export default function FormatTimestamp(timestamp: Date | string): string {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Use 24-hour format
    };
    return date.toLocaleString('en-GB', options).replace(',', '');
}