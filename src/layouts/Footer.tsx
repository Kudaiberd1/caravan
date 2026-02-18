const Footer = () => {
    return (
        <div className={"flex px-[20px] justify-between mt-auto mb-4 text-sm"}>
            <p className={"text-gray-500"}> © 2026 Caravan Resources. Доступ только для внутреннего использования. </p>
            <div className={"flex gap-4 text-gray-500"}>
                <p> Статус системы </p>
                <p> Поддержка </p>
                <p> Конфиденциальность </p>
            </div>
        </div>
    )
}

export default Footer;