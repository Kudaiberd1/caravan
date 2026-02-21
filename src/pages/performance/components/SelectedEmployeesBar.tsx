import pdfIcon from "../../../assets/icons/pdfIcon.svg";
import whatsappIcon from "../../../assets/icons/whatsappIcon.svg";
import messageIcon from "../../../assets/icons/messageIcon.svg";

type SelectedEmployeesBarProps = {
  count: number;
  selectedIds: string[];
  onPdf: (ids: string[]) => void;
  onWhatsapp: (ids: string[]) => void;
  onFeedback: (ids: string[]) => void;
};

export default function SelectedEmployeesBar({
  count,
  selectedIds,
  onPdf,
  onWhatsapp,
  onFeedback,
}: SelectedEmployeesBarProps) {
  return (
    <div className={"mt-3"}>
      <div className={"mx-auto"}>
        <div className={"flex items-center justify-between gap-4 rounded-xl bg-[#0B1220] text-white px-5 py-3 shadow-xl"}>
          <div className={"text-sm font-medium opacity-90 whitespace-nowrap"}>
            выбрано {count} сотрудника
          </div>

          <div className={"flex items-center gap-3"}>
            <div className={"h-5 w-px bg-white/15"} />

            <button
              type={"button"}
              className={"cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition"}
              onClick={() => onPdf(selectedIds)}
            >
              <img src={pdfIcon} alt={"pdf"} className={"h-4 w-4"} />
              PDF-отчет
            </button>

            <div className={"h-5 w-px bg-white/15"} />

            <button
              type={"button"}
              className={"cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition"}
              onClick={() => onWhatsapp(selectedIds)}
            >
              <img src={whatsappIcon} alt={"whatsapp"} className={"h-4 w-4"} />
              WhatsApp рассылка
            </button>

            <div className={"h-5 w-px bg-white/15"} />

            <button
              type={"button"}
              className={"cursor-pointer inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition"}
              onClick={() => onFeedback(selectedIds)}
            >
              <img src={messageIcon} alt={"message"} className={"h-4 w-4"} />
              Отправить отзыв руководителю
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}