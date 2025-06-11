import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC } from "react";

export interface IPriceField {
  label: string;
  price: number;
}

interface PriceFieldsProps extends BaseProps {
  fields: Map<string, number>;
}

export const PriceFields: FC<PriceFieldsProps> = (props) => {
  return (
    <div
      className={classNames(
        "grid grid-cols-3 text-sm gap-3 py-5",
        props.className
      )}
    >
      {Array.from(props.fields.entries()).map(
        (field: [label: string, price: number], idx) => (
          <React.Fragment key={idx}>
            <span
              className={classNames("col-span-2", {
                "text-destructive": field[1] < 0,
              })}
            >
              {field[0]}
            </span>
            <span
              className={classNames("col-span-1 text-right", {
                "text-destructive": field[1] < 0,
              })}
            >
              $ {field[1].toFixed(2)}
            </span>
          </React.Fragment>
        )
      )}
    </div>
  );
};
