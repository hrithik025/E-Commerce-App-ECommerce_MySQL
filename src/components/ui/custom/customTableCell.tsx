import { TableCell } from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import Link from "next/link";
import React, { FC } from "react";

interface CustomTableCellProps extends BaseProps {
  url?: string;
  children?: React.ReactNode;
}

interface CustomTableCellContentProps extends BaseProps {
  children?: React.ReactNode;
}

const CustomTableCellContent: FC<CustomTableCellContentProps> = (props) => {
  return (
    <div className={classNames("w-full h-full", props.className)}>
      {props.children}
    </div>
  );
};

export const CustomTableCell: FC<CustomTableCellProps> = (props) => {
  return (
    <TableCell className={classNames("h-full", props.className)}>
      {props.url ? (
        <Link href={props.url}>
          <CustomTableCellContent className="flex items-center">
            {props.children}
          </CustomTableCellContent>
        </Link>
      ) : (
        <CustomTableCellContent className="flex items-center">
          {props.children}
        </CustomTableCellContent>
      )}
    </TableCell>
  );
};
