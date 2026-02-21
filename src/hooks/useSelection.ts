import { useEffect, useState } from "react";

type UseSelectionArgs = {
    activeTab: number;
    isChecking: boolean;
};

export function useSelection({ activeTab, isChecking }: UseSelectionArgs) {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [selectedManagerIds, setSelectedManagerIds] = useState<string[]>([]);

    const toggleSelectedRows = (id: string) => {
        setSelectedRows((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const toggleSelectedManager = (id: string) => {
        setSelectedManagerIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedRows([]);
        if (!isChecking) setSelectedManagerIds([]);
    }, [activeTab, isChecking]);

    return {
        selectedRows,
        setSelectedRows,
        selectedManagerIds,
        setSelectedManagerIds,
        toggleSelectedRows,
        toggleSelectedManager,
    };
}