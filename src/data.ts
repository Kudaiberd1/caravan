import type {CriticalDeviationRow} from "./pages/Dashboard.tsx";

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
    anomalyId: number;
    departmentName: string;
    description: string;
    priorityLabel: "НЕМЕДЛЕННЫЙ" | "СЕРЕДИНА" | "ПРЕДУПРЕЖДЕНИЕ";
};

export type PersonnelRow = {
    id: string;
    Name: string;
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
        Name: "Өтепбергенов А.",
        fullName: "Өтепбергенов Ардақ Амантайұлы",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/60.jpg",
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
        Name: "Алғадаев Ж.",
        fullName: "Алғадаев Жарас Кендебайұлы",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/62.jpg",
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
        Name: "Денисов М.",
        fullName: "Денисов Максим",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/72.jpg",
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
        Name: "Солодовников А.",
        fullName: "Солодовников Антон Юрьевич",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/76.jpg",
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
        Name: "Байғазы Е.",
        fullName: "Байғазы Ерасыл Серғазыұлы",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/78.jpg",
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
        Name: "Төребай М.",
        fullName: "Төребай Мықтыбек Әбілбекұлы",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/80.jpg",
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
        Name: "Қаирғазы А.",
        fullName: "Қаирғазы Арсен Нұржанұлы",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/81.jpg",
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
        Name: "Исаев Ж.",
        fullName: "Исаев Жасұлан Сеитмұрадұлы",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/82.jpg",
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
        Name: "Бейбутов Ж.",
        fullName: "Бейбутов Жандос Нуржанович",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/87.jpg",
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
        Name: "Маевский Д.",
        fullName: "Маевский Денис Андреевич",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/79.jpg",
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
        Name: "Мустафинов С.",
        fullName: "Мустафинов Султан Даниярович",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/87.jpg",
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
        Name: "Байторов К.",
        fullName: "Байторов Куаныш Рахимжанович",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/113.jpg",
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
        Name: "Оспанов А.",
        fullName: "Оспанов Азамат Тулендиевич",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/111.jpg",
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
        Name: "Кулумбегов С.",
        fullName: "Кулумбегов Сергей Александрович",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/79.jpg",
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
        Name: "Суюмбаев А.",
        fullName: "Суюмбаев Алибек Айдарович",
        initials: "https://storage.yandexcloud.kz/demo-bucket-karavan/people_photos/59.jpg",
        role: "Инженер",
        plan: 160,
        actual: 172,
        pr: 90,
        nr: 85,
        deviation: 12,
        percent: 107.5,
        position: "sotrudnik",
    }
];
