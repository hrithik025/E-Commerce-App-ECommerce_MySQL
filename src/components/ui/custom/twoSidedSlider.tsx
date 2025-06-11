"use client";
import { Slider } from "@/components/ui/slider";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";

interface TwoSidedSliderProps extends BaseProps {
  min: number;
  max: number;
  step: number;
  defaultMinValue?: number;
  defaultMaxValue?: number;
  getMinText?: (value: number) => string;
  getMaxText?: (value: number) => string;
  onSliderChange: (minValue: number, maxValue: number) => void;
  disabled?: boolean;
}

export const TwoSidedSlider: FC<TwoSidedSliderProps> = (props) => {
  const [minValue, setMinValue] = useState<number>(
    props.defaultMinValue ?? props.min
  );
  const [maxValue, setMaxValue] = useState<number>(
    props.defaultMaxValue ?? props.max
  );

  useEffect(() => {
    setMinValue(props.defaultMinValue ?? props.min);
    setMaxValue(props.defaultMaxValue ?? props.max);
  }, [props]);

  const getMinText = props.getMinText ?? ((value) => `Min: ${value}`);
  const getMaxText = props.getMaxText ?? ((value) => `Max: ${value}`);

  const handleValueChange = (values: number[]) => {
    setMinValue(values[0]);
    setMaxValue(values[1]);
  };

  const onSliderValueChange = (values: number[]) => {
    props.onSliderChange(values[0], values[1]);
  };

  return (
    <div className={classNames(props.className)}>
      <Slider
        value={[minValue, maxValue]} // Controlled state for the range
        onValueChange={handleValueChange} // Updates the slider values
        onValueCommit={onSliderValueChange}
        min={props.min}
        max={props.max}
        step={props.step}
        className="relative"
        disabled={props.disabled ?? false}
      >
        <div
          className="absolute"
          style={{
            left: `${minValue}%`,
            width: `${maxValue - minValue}%`,
          }}
        />
      </Slider>
      <div className="flex justify-between mt-4 text-sm text-gray-700 font-semibold">
        <span>{getMinText(minValue)}</span>
        <span>{getMaxText(maxValue)}</span>
      </div>
    </div>
  );
};
