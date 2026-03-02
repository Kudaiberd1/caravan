export const DensityLegend = () => {
    return (
        <div className="flex mt-4 items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-3 w-fit shadow-sm">
            <span className="text-sm font-semibold text-gray-500 tracking-wide">
                ПЛОТНОСТЬ
            </span>

            <div className="mx-6 flex h-3 w-40 overflow-hidden rounded-full">
                <div className="w-1/4 bg-emerald-200" />
                <div className="w-1/4 bg-yellow-200" />
                <div className="w-1/4 bg-orange-400" />
                <div className="w-1/4 bg-red-400" />
            </div>

            <span className="text-sm font-semibold text-gray-700">
                ВЫСОКИЙ
            </span>
        </div>
    );
};