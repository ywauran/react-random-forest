import React from "react";
import Tree from "react-d3-tree";

const renderCustomNode = ({ nodeDatum }) => (
  <g>
    <circle r={15} fill="white" />
    <text fill="black" x={10} y={35} textAnchor="middle">
      {nodeDatum.name}
    </text>
  </g>
);

const TreeComponent = ({ stock }) => {
  const treeData = [
    {
      name: "Diskon",
      children: [
        {
          name: "Ya",
          children: [
            {
              name: `Stok Tersedia <= ${stock.toFixed(2)}`,
            },
            {
              name: `Stok Tersedia > ${stock.toFixed(2)}`,
            },
          ],
        },
        {
          name: "Tidak",
          children: [
            {
              name: `Stok Tersedia <= ${stock.toFixed(2)}`,
            },
            {
              name: `Stok Tersedia > ${stock.toFixed(2)}`,
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="w-full h-[500px] flex justify-center items-center">
      <div className="w-full h-full">
        <Tree
          className="w-full h-full"
          data={treeData}
          orientation="vertical"
          renderCustomNodeElement={renderCustomNode}
        />
      </div>
    </div>
  );
};

export default TreeComponent;
