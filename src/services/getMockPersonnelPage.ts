import type {PaginatedResponse, PersonnelRow} from "../data.ts";

export function getMockPersonnelPage(
    allData: PersonnelRow[],
    page: number,
    size: number
): PaginatedResponse<PersonnelRow> {
    const start = (page - 1) * size;
    const end = start + size;
    const content = allData.slice(start, end);

    return {
        page,
        size,
        totalElements: allData.length,
        totalPages: Math.ceil(allData.length / size),
        content,
    };
}