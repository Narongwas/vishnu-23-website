"use client";

import React, { useState } from "react";
import Icon from "@/components/Icon";

const options = [
  { value: "qcf", label: "Quantitative Computational Finance" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
  { value: "option5", label: "Option 5" },
  { value: "option6", label: "Option 6" },
];

const SelectDropDown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | (typeof options)[0]>(null);

  return (
    <div className="type-title-medium relative flex items-center justify-center px-10">
      <div
        className="z-10 inline-flex w-40 cursor-pointer items-center justify-center gap-3 bg-white px-4 py-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="w-full truncate bg-transparent text-lg focus:outline-none">
          {selected ? selected.label : "เลือกชมรม"}
        </span>
        <Icon name={open ? "expand_less" : "expand_more"} />
      </div>
      {open && (
        <div className="absolute top-full z-20 max-h-24 w-80 overflow-y-auto rounded border border-gray-300 bg-white shadow">
          {options.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                selected?.value === option.value ? "bg-gray-200" : ""
              }`}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropDown;
