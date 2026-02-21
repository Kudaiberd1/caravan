import { useEffect, useMemo, useState } from "react";

export type PaginatedResponse<T> = {
    content: T[];
    page: number;          // 1-based
    size: number;
    totalElements: number;
    totalPages: number;
};

export type PersonnelRow = {
    id: string;
    fullName: string;
    role: string;
    position: "sotrudnik" | "rukovoditel";

    initials: string;
    plan: number;
    actual: number;
    pr: number;
    nr: number;
    deviation: number;
    percent: number;
};

export function getMockPersonnelPage<T>(
    allData: T[],
    page: number,
    size: number
): PaginatedResponse<T> {
    const totalElements = allData.length;
    const totalPages = Math.max(1, Math.ceil(totalElements / size));
    const safePage = Math.min(Math.max(1, page), totalPages);

    const start = (safePage - 1) * size;
    const end = start + size;

    return {
        page: safePage,
        size,
        totalElements,
        totalPages,
        content: allData.slice(start, end),
    };
}

type UsePersonnelFiltersArgs = {
    data: PersonnelRow[];
    activeTab: number;        // 1=Сотрудника, 2=Руководителя
    search: string;
    pageSize?: number;
};

export function usePersonnelFilters({
                                        data,
                                        activeTab,
                                        search,
                                        pageSize = 10,
                                    }: UsePersonnelFiltersArgs) {
    // 1) build filtered base dataset
    const basePersonnel = useMemo(() => {
        const position = activeTab === 1 ? "sotrudnik" : "rukovoditel";
        const q = search.trim().toLowerCase();

        return data.filter((p) => {
            if (p.position !== position) return false;
            if (!q) return true;
            return (
                p.fullName.toLowerCase().includes(q) ||
                p.role.toLowerCase().includes(q)
            );
        });
    }, [data, activeTab, search]);

    // 2) keep pagination response in state (backend-like)
    const [response, setResponse] = useState<PaginatedResponse<PersonnelRow>>(() =>
        getMockPersonnelPage(basePersonnel, 1, pageSize)
    );

    // 3) when base dataset changes (tab/search), reset to page 1
    useEffect(() => {
        setResponse(getMockPersonnelPage(basePersonnel, 1, pageSize));
    }, [basePersonnel, pageSize]);

    // 4) function to change page
    const setPage = (page: number) => {
        setResponse(getMockPersonnelPage(basePersonnel, page, pageSize));
    };

    return {
        basePersonnel,
        response,
        setPage,
    };
}