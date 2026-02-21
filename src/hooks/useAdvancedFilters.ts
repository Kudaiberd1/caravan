import { useMemo, useState } from "react";

export function useAdvancedFilters() {
    const tabs = useMemo(() => ["Алмалы", "Алматы", "Ашыктас", "Майкудук"], []);

    const [activeCityTab, setActiveCityTab] = useState<number>(1);
    const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    const toggleSelectedDepartment = (id: number) => {
        setSelectedDepartments((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const closeAndResetDepartments = () => {
        setOpen(false);
        setSelectedDepartments([]);
    };

    return {
        tabs,

        open,
        setOpen,

        activeCityTab,
        setActiveCityTab,

        selectedDepartments,
        setSelectedDepartments,
        toggleSelectedDepartment,

        closeAndResetDepartments,
    };
}