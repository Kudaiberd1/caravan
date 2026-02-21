type PersonnelRow = {
  id: string;
  initials: string;
  fullName: string;
  role: string;
  plan: number;
  actual: number;
  pr: number;
  nr: number;
  deviation: number;
  percent: number;
};

type PersonnelTableProps = {
  rows: PersonnelRow[];
  activeTab: number;
  selectedRows: string[];
  selectedManagerIds: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedManagerIds: React.Dispatch<React.SetStateAction<string[]>>;
  onToggleRow: (id: string) => void;
  onToggleManager: (id: string) => void;
};

export default function PersonnelTable({
  rows,
  activeTab,
  selectedRows,
  selectedManagerIds,
  setSelectedRows,
  setSelectedManagerIds,
  onToggleRow,
  onToggleManager,
}: PersonnelTableProps) {
  const pageIds = rows.map((r) => r.id);
  const currentSelected = activeTab === 1 ? selectedRows : selectedManagerIds;

  const anyOnPageSelected = pageIds.some((id) => currentSelected.includes(id));
  const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => currentSelected.includes(id));

  const toggleSelectAllOnPage = () => {
    if (pageIds.length === 0) return;

    if (allOnPageSelected) {
      if (activeTab === 1) {
        setSelectedRows((prev) => prev.filter((id) => !pageIds.includes(id)));
      } else {
        setSelectedManagerIds((prev) => prev.filter((id) => !pageIds.includes(id)));
      }
      return;
    }

    if (activeTab === 1) {
      setSelectedRows((prev) => {
        const set = new Set(prev);
        for (const id of pageIds) set.add(id);
        return Array.from(set);
      });
    } else {
      setSelectedManagerIds((prev) => {
        const set = new Set(prev);
        for (const id of pageIds) set.add(id);
        return Array.from(set);
      });
    }
  };
  return (
    <div className={"w-full"}>
      <div className={"w-full overflow-x-auto"}>
        <table className={"w-full border-collapse"}>
          <thead>
            <tr className={"text-[11px] uppercase tracking-wide text-gray-400 border-b border-gray-200"}>
              <th className={"py-3 px-4 w-[44px]"}>
                <button
                  type="button"
                  onClick={toggleSelectAllOnPage}
                  className={
                    "h-4 w-4 rounded border flex items-center justify-center " +
                    (allOnPageSelected ? "border-blue-600" : anyOnPageSelected ? "border-blue-600" : "border-gray-300")
                  }
                  aria-label="select all on page"
                >
                  {allOnPageSelected && <span className="h-2 w-2 bg-blue-600" />}
                  {!allOnPageSelected && anyOnPageSelected && <span className="h-0.5 w-2 bg-blue-600" />}
                </button>
              </th>
              <th className={"py-3 pr-3 text-left"}>
                <div className={"inline-flex items-center gap-1"}>
                  <span>Имя сотрудника</span>
                  <span className={"text-gray-300"}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 10l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16 14l-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </th>
              <th className={"py-3 px-3 text-left"}>
                <div className={"inline-flex items-center gap-1"}>
                  <span>Роль</span>
                  <span className={"text-gray-300"}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 10l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16 14l-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </th>
              <th className={"py-3 px-3 text-center"}>План</th>
              <th className={"py-3 px-3 text-center"}>Дейс.</th>
              <th className={"py-3 px-3 text-center"}>П/Р</th>
              <th className={"py-3 px-3 text-center"}>Н/Р</th>
              <th className={"py-3 px-3 text-center"}>
                <div className={"inline-flex items-center gap-1"}>
                  <span>Разн.</span>
                  <span className={"text-gray-300"}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 10l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16 14l-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </th>
              <th className={"py-3 px-4 text-right"}>
                <div className={"inline-flex items-center justify-end gap-1 w-full"}>
                  <span>% эф.</span>
                  <span className={"text-gray-300"}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 10l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16 14l-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const isPositive = row.deviation > 0;
              const isNegative = row.deviation < 0;

              const percent = Number.isFinite(row.percent) ? row.percent : 0;
              const bar = Math.max(0, Math.min(100, percent));

              const devColor = isPositive ? "text-blue-600" : isNegative ? "text-red-600" : "text-gray-400";
              const devText = `${isPositive ? "+" : ""}${row.deviation}`;

              const barColor = isPositive ? "bg-blue-600" : isNegative ? "bg-red-500" : "bg-slate-700";

              const isSelected = activeTab === 1 ? selectedRows.includes(row.id) : selectedManagerIds.includes(row.id);

              return (
                <tr key={row.id} className={"border-b border-gray-100 hover:bg-gray-50/60"}>
                  <td className={"py-4 px-4"}>
                    <button
                      type="button"
                      onClick={() => (activeTab === 1 ? onToggleRow(row.id) : onToggleManager(row.id))}
                      className={
                        "h-4 w-4 rounded-full border flex items-center justify-center " +
                        (isSelected ? "border-blue-600" : "border-gray-300")
                      }
                      aria-label="select row"
                    >
                      {isSelected && <span className="h-2 w-2 rounded-full bg-blue-600" />}
                    </button>
                  </td>

                  <td className={"py-4 pr-3"}>
                    <div className={"cursor-pointer flex items-center gap-3"}>
                      <div className={"relative"}>
                        <div className={"h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-[12px] font-semibold text-indigo-700"}>
                          {row.initials}
                        </div>
                        <span className={"absolute -bottom-0.5 -left-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"} />
                      </div>
                      <div className={"text-sm font-semibold text-gray-900"}>{row.fullName}</div>
                    </div>
                  </td>

                  <td className={"py-4 px-3"}>
                    <span className={"inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold"}>
                      {row.role}
                    </span>
                  </td>

                  <td className={"py-4 px-3 text-center text-sm text-gray-500"}>{row.plan}</td>
                  <td className={"py-4 px-3 text-center text-sm font-semibold text-gray-900"}>{row.actual}</td>
                  <td className={"py-4 px-3 text-center text-sm text-gray-500"}>{row.pr}</td>
                  <td className={"py-4 px-3 text-center text-sm text-gray-500"}>{row.nr}</td>

                  <td className={"py-4 px-3 text-center"}>
                    <span className={"inline-flex items-center gap-1 text-sm font-semibold " + devColor}>
                      {devText}
                      {isPositive && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M10 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {isNegative && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 7l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M10 17h7v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {!isPositive && !isNegative && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                    </span>
                  </td>

                  <td className={"py-4 px-4 text-right"}>
                    <div className={"flex flex-col items-end gap-2"}>
                      <div className={"text-sm font-semibold text-gray-900"}>{percent.toFixed(1)}%</div>
                      <div className={"h-1.5 w-[92px] bg-gray-200 rounded-full overflow-hidden"}>
                        <div className={"h-full " + barColor} style={{ width: `${bar}%` }} />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}