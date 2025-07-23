import { StyleableFC } from "@/lib/types/misc";

const Twitch: StyleableFC<{ color: string }> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5.36328 2L2 6.63672V20H7V23H10L13 20H17L22 15V2H5.36328ZM6 4H20V13L17 16H12L9 19V16H6V4ZM11 7V12H13V7H11ZM16 7V12H18V7H16Z"
        className={`fill-${color}`}
      />
    </svg>
  );
};
export default Twitch;
