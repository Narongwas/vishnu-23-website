"use client";

interface PageActionProps {
  icon: string;
  text: string;
  onClick?: () => void;
}

export default function PageAction({ icon, text, onClick }: PageActionProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="
        fixed bottom-0 left-1/2
        w-full max-w-md h-[140px]
        flex flex-col items-center justify-center
        p-6 z-10 overflow-visible border-0 bg-none cursor-pointer text-center
        transform -translate-x-1/2
      "
    >
      <div
        className="
          absolute bottom-0 left-1/2
          w-[140vw] h-[270px]
          rounded-t-[1000px]
          -translate-x-1/2 translate-y-3/7
          bg-yellow
          -z-10
        "
      />

      <div className="font-icon text-[2.25rem] font-normal leading-[2.5rem] z-10 text-blue">
        {icon}
      </div>

      <div className="font-bold text-base leading-6 z-10 text-blue">{text}</div>
    </button>
  );
}
