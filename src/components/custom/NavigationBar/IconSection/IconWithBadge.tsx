import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

interface IconWithBadgeProps extends BaseProps {
  link: string;
  text?: string;
  children: ReactNode;
}

export const IconWithBadge: FC<IconWithBadgeProps> = (props) => {
  return (
    <Button
      asChild
      variant={"link"}
      size={"icon"}
      className={classNames("", props.className)}
    >
      <Link
        href={props.link}
        className="relative hover:[&>span]:bg-destructive/90"
      >
        {props.text && (
          <Badge variant={"custom"} className="absolute -top-1 -right-1">
            {props.text}
          </Badge>
        )}
        {props.children}
      </Link>
    </Button>
  );
};
