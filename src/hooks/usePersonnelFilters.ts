import { useEffect, useMemo, useState } from "react";
import type {PersonnelRow} from "../data.ts";

export type PaginatedResponse<T> = {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
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
    activeTab: number;
    search: string;
    pageSize?: number;
};

export function usePersonnelFilters({
                                        data,
                                        activeTab,
                                        search,
                                        pageSize = 10,
                                    }: UsePersonnelFiltersArgs) {
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

    const [response, setResponse] = useState<PaginatedResponse<PersonnelRow>>(() =>
        getMockPersonnelPage(basePersonnel, 1, pageSize)
    );

    useEffect(() => {
        setResponse(getMockPersonnelPage(basePersonnel, 1, pageSize));
    }, [basePersonnel, pageSize]);

    const setPage = (page: number) => {
        setResponse(getMockPersonnelPage(basePersonnel, page, pageSize));
    };

    return {
        basePersonnel,
        response,
        setPage,
    };
}