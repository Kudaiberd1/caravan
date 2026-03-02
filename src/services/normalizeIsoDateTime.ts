import {parseISO} from "date-fns";

export function normalizeIsoDateTime(value: string) {
    // Backend may send microseconds (6 digits), e.g. 2026-02-24T14:01:30.448253Z
    // Convert .448253Z -> .448Z (milliseconds)
    return value.replace(/\.(\d{3})\d+(?=Z|[+-]\d{2}:\d{2})/, ".$1");
}

export const dayWord = (n: number) => {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return "день";
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "дня";
    return "дней";
};

export const formatTimeAgo = (isoDateTime: string) => {
    const now = new Date();
    const d = parseISO(normalizeIsoDateTime(isoDateTime));
    const diffMs = now.getTime() - d.getTime();

    const mins = Math.floor(diffMs / (60 * 1000));
    if (mins < 60) return `${mins} мин. назад`;

    const hrs = Math.floor(diffMs / (60 * 60 * 1000));
    if (hrs < 24) return `${hrs} ч. назад`;

    const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    if (days === 1) return "1 день назад";
    return `${days} ${dayWord(days)} назад`;
};