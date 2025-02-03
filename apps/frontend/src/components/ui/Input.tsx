import { FC, InputHTMLAttributes } from "react";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className = "",
  ...props
}) => {
  return (
    <input
      {...props}
      className={`w-full
        px-4 py-2
        rounded-md
        border-2
        transition-all duration-300
        hover:bg-zinc-100 hover:border-zinc-200
        focus:outline-none focus:bg-zinc-200 focus:border-black
        ${className}`}
    />
  );
};

export default Input;
