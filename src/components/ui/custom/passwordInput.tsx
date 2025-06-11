"use client";
import { Button, Input } from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { FC, useState } from "react";

interface PasswordInputProps extends BaseProps {
  defaultValue?: string;
  disabled?: boolean;
  name: string;
  placeholder: string;
}

export const PasswordInput: FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const disabled = props.disabled ?? false;

  return (
    <React.Fragment>
      <Input
        type={showPassword ? "text" : "password"}
        className={classNames("hide-password-toggle pr-10", props.className)}
        name={props.name}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
      >
        {showPassword && !disabled ? (
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>
    </React.Fragment>
  );
};
