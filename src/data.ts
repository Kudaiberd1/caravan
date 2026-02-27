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
    Name: string;
    fullName: string;
    initials: string;
    role: string;
    plan: number;
    actual: number;
    pr: number;
    nr: number;
    deviation: number;
    percent: number;
    position: "sotrudnik" | "rukovoditel";
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
