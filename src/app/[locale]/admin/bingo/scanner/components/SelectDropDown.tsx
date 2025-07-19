"use client";

import React, { useState } from "react";
import Icon from "@/components/Icon";
import { StyleableFC } from "@/lib/types/misc";

const options = [
  { value: "0", label: "ชมรมฟุตบอลคณะวิศวกรรมศาสตร์" },
  { value: "1", label: "INTANIA INNOVATION CONTEST" },
  { value: "2", label: "ชมรมฟอร์มูล่า" },
  { value: "3", label: "เทเบิลเทนนิส" },
  { value: "4", label: "INTANIA BASEBALL & SOFTBALL CLUB" },
  { value: "5", label: "INTANIA RUNNING CLUB" },
  { value: "6", label: "INTANIA RUGBY CLUB" },
  { value: "7", label: "AWAREHOUSE" },
  { value: "8", label: "ชมรมหมากกระดาน" },
  { value: "9", label: "ชมรมวอลเลย์บอล" },
  { value: "10", label: "STEPOUT" },
  { value: "11", label: "INTANIA PRODUCTION HOUSE" },
  { value: "12", label: "ENGINEERING EXPATS CLUB" },
  {
    value: "13",
    label: "ชมรมบาสเกตบอล คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
  },
  { value: "14", label: "ค่ายยุววิศวกรมพิธ" },
  { value: "15", label: "INTANIAVERSE" },
  { value: "16", label: "ชมรมนักประดิษฐ์วิศวกรรม" },
  { value: "17", label: "มวยสากล" },
  { value: "18", label: "INTANIA SWIMMING CLUB" },
  { value: "19", label: "INTANIA STAGE PLAY" },
  { value: "20", label: "MMA" },
  { value: "21", label: "ชมรมเทนนิส - INTANIA TENNIS CLUB" },
  { value: "22", label: "FECAMP" },
  { value: "23", label: "THAILAND INCUBATOR CLUB (THINC.)" },
  { value: "24", label: "ชมรมแบตมินตัน" },
  { value: "25", label: "ชมรมนิสิตทุน" },
  { value: "26", label: "โต้วาที (INTANIA DEBATE CLUB)" },
  { value: "27", label: "ชมรมวิชาการ คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย" },
];

type SelectDropDownProps = {
  onClubSelect: (clubId: number) => void;
};

const SelectDropDown: StyleableFC<SelectDropDownProps> = ({ onClubSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | (typeof options)[0]>(null);

  const handleSelectOption = (option: (typeof options)[0]) => {
    setSelected(option);
    onClubSelect(parseInt(option.value, 10)); // Pass the numeric ID up
    setOpen(false);
  };

  return (
    <div className="type-title-medium relative flex items-center justify-center">
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
        <div className="absolute top-full z-20 max-h-48 w-80 overflow-y-auto rounded border border-gray-300 bg-white shadow">
          {options.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                selected?.value === option.value ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSelectOption(option)}
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
