export const toggleSelectAllOnPage = (pageIds: string[], allOnPageSelected: boolean, setSelectedReportIds: (ids: string[] | ((prev: string[]) => string[])) => void) => {
    if (pageIds.length === 0) return;

    if (allOnPageSelected) {
        setSelectedReportIds((prev) => prev.filter((id) => !pageIds.includes(id)));
        return;
    }

    setSelectedReportIds((prev) => {
        const set = new Set(prev);
        for (const id of pageIds) set.add(id);
        return Array.from(set);
    });
};

export const toggleSelectOnePage = (id : string, setSelectedReportIds :  (ids: string[] | ((prev: string[]) => string[])) => void) => {
    setSelectedReportIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
};