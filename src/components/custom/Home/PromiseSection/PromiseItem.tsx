import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC, ReactNode } from "react";

interface PromiseItemProps extends BaseProps {
  text: string;
  subtext: string;
  children: ReactNode;
}

export const PromiseItem: FC<PromiseItemProps> = (props) => {
  return (
    <div
      className={classNames(
        "flex gap-3 border-r-2 w-full justify-center last:border-r-0 [&>svg]:text-black/50",
        props.className
      )}
    >
      {props.children}
      <div className="flex flex-col gap-1 justify-center uppercase font-semibold">
        <span>{props.text}</span>
        <span className="text-black/50 text-xs">{props.subtext}</span>
      </div>
    </div>
  );
};
