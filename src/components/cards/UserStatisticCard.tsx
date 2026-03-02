const UserStatisticCard = () => {
    return (
        <div className={"col-span-1 bg-[rgb(41,46,59)] rounded-xl p-6 text-white"}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div
                        className="text-[11px] tracking-widest font-semibold uppercase text-gray-200">
                        Статус дисциплины
                    </div>
                    <div className="mt-2 text-2xl font-extrabold tracking-wide">ЗЕЛЕНЫЙ</div>
                    <p className="mt-2 text-sm text-gray-300 leading-snug max-w-[280px]">
                        Сотрудник полностью соблюдает протоколы ACS. В этом месяце критических
                        нарушений не выявлено.
                    </p>
                </div>

                <div className="relative shrink-0">
                    <div
                        className="h-12 w-12 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg" className="text-green-500">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>

            <div
                className="mt-5 h-2 w-full rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                <div className="h-full w-[38%] rounded-full bg-green-500"/>
            </div>
        </div>
    )
}

export default UserStatisticCard;