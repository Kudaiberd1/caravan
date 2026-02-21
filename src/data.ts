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

export type PersonnelRow = {
    id: string;
    fullName: string;
    initials: string;
    role: string;
    plan: number;
    actual: number;
    pr: number;
    nr: number;
    deviation: number;   // +15, -3 etc
    percent: number;     // 109.4
    position: "sotrudnik" | "rukovoditel";
};

export type PaginatedResponse<T> = {
    content: T[];
    page: number;          // current page (1-based)
    size: number;          // items per page
    totalElements: number; // total records in DB
    totalPages: number;
};

export const mockPersonnel: PersonnelRow[] = [
    // ===== Сотрудники =====
    {
        id: "1",
        fullName: "Иванов В.",
        initials: "II",
        role: "Шахтер",
        plan: 160,
        actual: 175,
        pr: 80,
        nr: 80,
        deviation: 15,
        percent: 109.4,
        position: "sotrudnik",
    },
    {
        id: "2",
        fullName: "Петров П.",
        initials: "PP",
        role: "Шахтер",
        plan: 160,
        actual: 145,
        pr: 65,
        nr: 77,
        deviation: -15,
        percent: 90.6,
        position: "sotrudnik",
    },
    {
        id: "3",
        fullName: "Сидоров С.",
        initials: "SC",
        role: "Водитель",
        plan: 160,
        actual: 158,
        pr: 77,
        nr: 67,
        deviation: -2,
        percent: 98.8,
        position: "sotrudnik",
    },
    {
        id: "4",
        fullName: "Кузнецов К.",
        initials: "KK",
        role: "Бригадир",
        plan: 160,
        actual: 161,
        pr: 55,
        nr: 56,
        deviation: 1,
        percent: 100.6,
        position: "sotrudnik",
    },
    {
        id: "5",
        fullName: "Смирнов А.",
        initials: "SA",
        role: "Шахтер",
        plan: 160,
        actual: 160,
        pr: 90,
        nr: 40,
        deviation: 0,
        percent: 100.0,
        position: "sotrudnik",
    },
    {
        id: "6",
        fullName: "Васильев В.",
        initials: "VB",
        role: "Инженер",
        plan: 160,
        actual: 161,
        pr: 100,
        nr: 100,
        deviation: 1,
        percent: 100.6,
        position: "sotrudnik",
    },

    // ===== Руководители =====
    {
        id: "7",
        fullName: "Асылбек С.",
        initials: "II",
        role: "Шахтер",
        plan: 160,
        actual: 175,
        pr: 80,
        nr: 80,
        deviation: 15,
        percent: 109.4,
        position: "rukovoditel",
    },
    {
        id: "8",
        fullName: "Ерлан Е.",
        initials: "PP",
        role: "Шахтер",
        plan: 160,
        actual: 145,
        pr: 65,
        nr: 77,
        deviation: -15,
        percent: 90.6,
        position: "rukovoditel",
    },
    {
        id: "9",
        fullName: "Игорь В.",
        initials: "SC",
        role: "Водитель",
        plan: 160,
        actual: 158,
        pr: 77,
        nr: 67,
        deviation: -2,
        percent: 98.8,
        position: "rukovoditel",
    },
    {
        id: "10",
        fullName: "Бауржан Д.",
        initials: "KK",
        role: "Бригадир",
        plan: 160,
        actual: 161,
        pr: 55,
        nr: 56,
        deviation: 1,
        percent: 100.6,
        position: "rukovoditel",
    },
    {
        id: "11",
        fullName: "Кайсар А.",
        initials: "SA",
        role: "Шахтер",
        plan: 160,
        actual: 160,
        pr: 90,
        nr: 40,
        deviation: 0,
        percent: 100.0,
        position: "rukovoditel",
    },
    // ===== Additional Сотрудники =====
    {
        id: "12",
        fullName: "Григорьев Д.",
        initials: "GD",
        role: "Шахтер",
        plan: 160,
        actual: 168,
        pr: 82,
        nr: 78,
        deviation: 8,
        percent: 105.0,
        position: "sotrudnik",
    },
    {
        id: "13",
        fullName: "Андреев М.",
        initials: "AM",
        role: "Водитель",
        plan: 160,
        actual: 150,
        pr: 70,
        nr: 72,
        deviation: -10,
        percent: 93.8,
        position: "sotrudnik",
    },
    {
        id: "14",
        fullName: "Тимофеев Р.",
        initials: "TR",
        role: "Бригадир",
        plan: 160,
        actual: 162,
        pr: 60,
        nr: 58,
        deviation: 2,
        percent: 101.3,
        position: "sotrudnik",
    },
    {
        id: "15",
        fullName: "Зайцев К.",
        initials: "ZK",
        role: "Инженер",
        plan: 160,
        actual: 172,
        pr: 90,
        nr: 85,
        deviation: 12,
        percent: 107.5,
        position: "sotrudnik",
    },
    {
        id: "16",
        fullName: "Орлов И.",
        initials: "OI",
        role: "Шахтер",
        plan: 160,
        actual: 158,
        pr: 76,
        nr: 80,
        deviation: -2,
        percent: 98.8,
        position: "sotrudnik",
    },
    {
        id: "17",
        fullName: "Морозов С.",
        initials: "MS",
        role: "Водитель",
        plan: 160,
        actual: 165,
        pr: 85,
        nr: 83,
        deviation: 5,
        percent: 103.1,
        position: "sotrudnik",
    },
    {
        id: "18",
        fullName: "Калинин П.",
        initials: "KP",
        role: "Шахтер",
        plan: 160,
        actual: 142,
        pr: 60,
        nr: 70,
        deviation: -18,
        percent: 88.8,
        position: "sotrudnik",
    },
    {
        id: "19",
        fullName: "Лебедев А.",
        initials: "LA",
        role: "Инженер",
        plan: 160,
        actual: 160,
        pr: 80,
        nr: 80,
        deviation: 0,
        percent: 100.0,
        position: "sotrudnik",
    },
    {
        id: "20",
        fullName: "Крылов Н.",
        initials: "KN",
        role: "Бригадир",
        plan: 160,
        actual: 155,
        pr: 72,
        nr: 75,
        deviation: -5,
        percent: 96.9,
        position: "sotrudnik",
    },
    {
        id: "21",
        fullName: "Соловьев В.",
        initials: "SV",
        role: "Шахтер",
        plan: 160,
        actual: 174,
        pr: 88,
        nr: 86,
        deviation: 14,
        percent: 108.8,
        position: "sotrudnik",
    },

];