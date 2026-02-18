import type {DepartmentStaffing} from "../pages/Dashboard.tsx";

export type StaffingStatus = "green" | "yellow" | "orange" | "red";

const getStatus = (ratio: number): StaffingStatus => {
    if (ratio >= 0.90) return "green";
    if (ratio >= 0.80) return "yellow";
    if (ratio >= 0.7) return "orange";
    return "red";
};

const STATUS_CLASSES: Record<StaffingStatus, string> = {
    green: "border-emerald-400 bg-emerald-200/60",
    yellow: "border-yellow-300 bg-yellow-100/70",
    orange: "border-orange-400 bg-orange-200/80",
    red: "border-red-400 bg-red-200/80",
};

type Props = {
    staffing: DepartmentStaffing;
};

const DepartmentCard = ({staffing}: Props) => {
    const status = getStatus(staffing.current / staffing.target);

    return (
        <div
            className={
                "w-full flex items-center justify-center border-2 rounded-xl px-6 py-2 min-h-[44px] " +
                STATUS_CLASSES[status]
            }
        >
            <p className="text-center text-slate-600 text-sm leading-snug break-words">
                {staffing.name} - <span className="font-semibold text-slate-700">{staffing.current}</span>
            </p>
        </div>
    );
};

export default DepartmentCard;