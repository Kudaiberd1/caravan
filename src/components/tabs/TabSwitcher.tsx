
interface Props {
    text1: string;
    text2: string;
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

const TabSwitcher = ({text1, text2, active, setActive} : Props) => {
    return (
        <div className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200 my-auto">
            <button
                onClick={() => setActive(1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${active === 1
                    ? "bg-white shadow text-[#1F2A44]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
                {text1}
            </button>

            <button
                onClick={() => setActive(2)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${active === 2
                    ? "bg-white shadow text-[#1F2A44]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
                {text2}
            </button>
        </div>
    )
}

export default TabSwitcher;