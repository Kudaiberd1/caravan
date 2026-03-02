export const TableSkeleton = ({ rows = 8 }: { rows?: number }) => (
    <tbody>
    {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className={"border-b border-gray-100"}>
            <td className={"py-4 px-4"}>
                <div className={"h-4 w-4 rounded-full bg-gray-200 animate-pulse"} />
            </td>
            <td className={"py-4 pr-3"}>
                <div className={"h-4 w-40 bg-gray-200 rounded animate-pulse"} />
            </td>
            <td className={"py-4 px-3"}>
                <div className={"h-4 w-56 bg-gray-200 rounded animate-pulse"} />
            </td>
            <td className={"py-4 px-3"}>
                <div className={"h-4 w-[520px] max-w-full bg-gray-200 rounded animate-pulse"} />
            </td>
            <td className={"py-4 px-3"}>
                <div className={"h-4 w-24 bg-gray-200 rounded animate-pulse"} />
            </td>
            <td className={"py-4 px-4 text-right"}>
                <div className={"h-9 w-9 rounded-full bg-gray-200 animate-pulse ml-auto"} />
            </td>
        </tr>
    ))}
    </tbody>
);