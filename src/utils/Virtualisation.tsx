"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
import { List, RowComponentProps } from "react-window";

function Virtualisation() {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    const data = Array.from({ length: 1000 }, (_, i) => `Row ${i}`);

    setItems(data ?? []);
  }, []);

  // const handleGenerate = () => {
  //   const data = Array.from({ length: 100000 }, (_, i) => `Row ${i}`);
  //   setItems(data ?? []);

  const rowComponent = useCallback(
    ({ style, index }: RowComponentProps) => {
      return (
        <div className="cursor-pointer" style={style}>
          {items[index]}
        </div>
      );
    },
    [items]
  );

  return (
    <div>
      <button
        className="bg-red-100 text-black rounded-md px-4 py-2"
        // onClick={handleGenerate}
      >
        Generate
      </button>

      <div className="bg-red-900 w-full mt-5 h-[400px]">
        <List
          className="text-white"
          rowComponent={rowComponent}
          rowCount={items.length}
          rowHeight={items.length > 0 ? 25 : 0}
          rowProps={{ items }}
        />
      </div>
    </div>
  );
}

export default memo(Virtualisation);
