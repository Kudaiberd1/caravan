
interface Props {
    tabs: string[];
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

const MultipleTabSwitcher = ({tabs, active, setActive} : Props) => {
    return (
        <div className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200 my-auto">
            {tabs.map((tab, index) => (
                <button
                    onClick={() => setActive(index+1)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${active === index+1
                        ? "bg-white shadow text-[#1F2A44]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    {tab}
                </button>))
            }
        </div>
    )
}

export default MultipleTabSwitcher;