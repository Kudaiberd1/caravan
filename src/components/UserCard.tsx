import {useNavigate} from "react-router-dom";
import type {PersonnelRow} from "../data.ts";

interface Prop {
    person: PersonnelRow;
}

const UserCard = ({person} : Prop) => {

    const navigate = useNavigate();

    return (
        <div
            className="col-span-2 bg-[rgb(41,46,59)] rounded-xl p-6 text-white w-full border border-[rgba(255,255,255,0.06)]">
            <div className="flex items-start gap-6">
                {/* Avatar (no photo) */}
                <img src={person.initials} className={"h-[62px] w-[62px] rounded-full object-cover"} />

                {/* Main info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            {person.position==="rukovoditel" ?
                                <h2 className="text-[20px] font-extrabold leading-tight truncate">
                                    {person.fullName} - Майкудук
                                </h2>
                                :
                                <h2 className="text-[20px] font-extrabold leading-tight truncate">
                                    {person.fullName} - Алмалы
                                </h2>
                            }
                            <p className="mt-1 text-sm text-gray-300">
                                Менеджер по продажам • Смена А
                            </p>
                        </div>

                        <div className="shrink-0">
                                                <span
                                                    className="inline-flex items-center rounded-full bg-[rgb(18,24,39)] px-3 py-1 text-[12px] font-semibold text-gray-200">
                                                    ID: #{person.id}
                                                </span>
                        </div>
                    </div>

                    <div className="mt-4 h-px w-full bg-[rgba(255,255,255,0.18)]"/>

                    {/* Stats */}
                    <div className="mt-4 grid grid-cols-4 gap-6">
                        <div>
                            <div
                                className="text-[11px] tracking-widest uppercase text-gray-300">План
                                (часы)
                            </div>
                            <div className="mt-1 text-[15px] font-semibold text-gray-100">160ч</div>
                        </div>

                        <div>
                            <div
                                className="text-[11px] tracking-widest uppercase text-gray-300">Действительный
                            </div>
                            <div className="mt-1 text-[15px] font-semibold text-gray-100">162ч</div>
                        </div>

                        <div>
                            <div
                                className="text-[11px] tracking-widest uppercase text-gray-300">Эффективность
                            </div>
                            <div
                                className="mt-1 text-[15px] font-extrabold text-green-500">101.25%
                            </div>
                        </div>

                        {person.position==="rukovoditel" ?
                            <div>
                                <div
                                    className="text-[11px] tracking-widest uppercase text-gray-300">Эффективность команды
                                </div>
                                <button type="button"
                                        className="text-green-500 mt-1 inline-flex items-center gap-2 text-[15px] font-semibold">
                                    101.25%
                                </button>
                            </div>
                            :
                            <div>
                                <div
                                    className="text-[11px] tracking-widest uppercase text-gray-300">Руководитель
                                </div>
                                <button type="button"
                                        onClick={() => navigate(`/user/supervisor/7`)}
                                        className="cursor-pointer mt-1 inline-flex items-center gap-2 text-[15px] font-semibold text-gray-100 hover:text-white transition uppercase">
                                    Қаирғазы А.
                                    <span className="text-gray-300">›</span>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UserCard;
