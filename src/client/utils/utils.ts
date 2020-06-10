// @ts-nocheck

export function generateDateTimeString(timestamp, clockDisplay) {
    const d = new Date(timestamp);

    const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

    const day = d.getDate();
    const month = months[d.getMonth()];
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let meridiem = '';

    if (clockDisplay === '12') {
        meridiem = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;

        if (hours === 0) {
            hours = '12';
        }
    }

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;

    return `${day} ${month}, ${hours}:${minutes}${meridiem}`;
}