import clsx from "clsx"
import { format, formatISO } from "date-fns"

export default function Time({
    date,
    className,
}: {
    date: Date
    className?: string
}) {
    return (
        <time
            className={clsx(
                "text-sm py-0.5 text-gray-500 dark:text-stone-100",
                className
            )}
            dateTime={formatISO(date)}
        >
            {format(date, "LLLL d, yyyy")}
        </time>
    )
}
