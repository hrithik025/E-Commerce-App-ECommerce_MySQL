import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC } from "react";

interface SeperatorProps extends BaseProps {
  children: React.ReactNode;
}

export const Seperator: FC<SeperatorProps> = (props) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-center",
        props.className
      )}
    >
      <div className="flex-grow border-t border-gray-300"></div>
      {props.children}
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};
