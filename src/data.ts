import type {CriticalDeviationRow, DepartmentStaffing} from "./pages/Dashboard.tsx";

export const mockDepartments: DepartmentStaffing[] = [
    {id: "gen-dir", name: "Генеральная дирекция", current: 1, target: 1},
    {id: "geo", name: "Геологический департамент", current: 1, target: 1},
    {id: "internal-control", name: "Департамент внутреннего контроля", current: 1, target: 1},
    {id: "mining", name: "Департамент горного производства", current: 185, target: 210},
    {id: "it", name: "Департамент информационных технологий", current: 2, target: 3},
    {id: "heap-leaching", name: "Департамент кучного выщелачивания", current: 28, target: 80},
    {id: "logistics", name: "Департамент логистики", current: 68, target: 80},
    {id: "mto", name: "Департамент материально-технического обеспечения", current: 27, target: 30},
    {id: "hr-social", name: "Департамент по персоналу и социальным вопросам", current: 3, target: 4},

    {id: "pm", name: "Департамент проектного управления", current: 2, target: 2},
    {id: "production-support", name: "Департамент производственного обеспечения", current: 157, target: 175},
    {
        id: "hse",
        name: "Департамент промышленной безопасности, охраны труда и окружающей среды",
        current: 13,
        target: 15
    },
    {id: "ore-prep", name: "Департамент рудоподготовки", current: 59, target: 80},
    {id: "construction", name: "Департамент строительства", current: 1, target: 1},
    {id: "metallurgy", name: "Металлургический департамент", current: 46, target: 52},
    {id: "security", name: "Охранная компания", current: 15, target: 18},
    {id: "tech", name: "Технологический департамент", current: 33, target: 38},
    {id: "finance", name: "Финансовый департамент", current: 2, target: 2},
];

export const departments = [
    { id: "general", label: "Генеральная дирекция" },
    { id: "geology", label: "Геологический департамент" },
    { id: "internal_control", label: "Департамент внутреннего контроля" },
    { id: "mining", label: "Департамент горного производства" },
    { id: "it", label: "Департамент информационных технологий" },
    { id: "heap_leaching", label: "Департамент кучного выщелачивания" },
    { id: "logistics", label: "Департамент логистики" },
    { id: "supply", label: "Департамент материально-технического обеспечения" }
];

export const criticalDeviationsMock: CriticalDeviationRow[] = [
    { id: "1", employee: "Petrov P.", department: "Шахтер", devHours: -15.0, percent: 90.6 },
    { id: "2", employee: "Ivanov I.", department: "Логистика", devHours: 12.2, percent: 107.4 },
    { id: "3", employee: "Sidorov S.", department: "Бурение", devHours: -8.5, percent: 94.7 },
    { id: "4", employee: "Kuznetsov K.", department: "Обслуживание", devHours: 6.1, percent: 103.2 },
    { id: "5", employee: "Smirnov A.", department: "Безопасность", devHours: -4.2, percent: 97.4 },
    { id: "6", employee: "Petrov P.", department: "Шахтер", devHours: -15.0, percent: 90.6 },
    { id: "7", employee: "Ivanov I.", department: "Логистика", devHours: 12.2, percent: 107.4 },
    { id: "8", employee: "Sidorov S.", department: "Бурение", devHours: -8.5, percent: 94.7 },
    { id: "9", employee: "Kuznetsov K.", department: "Обслуживание", devHours: 6.1, percent: 103.2 },
    { id: "10", employee: "Smirnov A.", department: "Безопасность", devHours: -4.2, percent: 97.4 },
];

export type ActiveAnomaly = {
    id: string;
    title: string;
    subtitle: string;
    status: "НЕМЕДЛЕННЫЙ" | "СЕРЕДИНА" | "ПРЕДУПРЕЖДЕНИЕ";
    accent: "red" | "amber" | "gray";
    actions: { label: string; variant: "primary" | "danger" | "warning" | "ghost" }[];
};

export const activeAnomaliesMock: ActiveAnomaly[] = [
    {
        id: "a1",
        title: "Пропущенный инструктаж по технике безопасности",
        subtitle: "Сидоров С. (ID: 4821) проехал контрольно-пропускной пункт № 2 без медицинского разрешения.",
        status: "НЕМЕДЛЕННЫЙ",
        accent: "red",
        actions: [
            { label: "Уведомить руководителя", variant: "primary" },
            { label: "Оправдывать", variant: "ghost" },
        ],
    },
    {
        id: "a2",
        title: "Несанкционированный доступ в зону",
        subtitle: "Петров П. - Зона шахты 3 (требуется уровень доступа 4).",
        status: "СЕРЕДИНА",
        accent: "amber",
        actions: [
            { label: "Уведомить руководителя", variant: "primary" },
            { label: "Оповещение безопасности", variant: "warning" },
            { label: "Оправдывать", variant: "ghost" },
        ],
    },
    {
        id: "a3",
        title: "Увеличенный перерыв (от 65 мин)",
        subtitle: "Буровая бригада (группа 4) обнаружена в столовой с 12:45.",
        status: "ПРЕДУПРЕЖДЕНИЕ",
        accent: "gray",
        actions: [
            { label: "Уведомить руководителя", variant: "primary" },
            { label: "Оправдывать", variant: "ghost" },
        ],
    },
];