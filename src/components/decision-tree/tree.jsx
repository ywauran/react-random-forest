// src/TreeComponent.js
import React from "react";
import Tree from "react-d3-tree";

const treeData = [
  {
    name: "Parent",
    children: [
      {
        name: "Child One",
        children: [
          {
            name: "Grandchild One",
          },
          {
            name: "Grandchild Two",
          },
        ],
      },
      {
        name: "Child Two",
      },
    ],
  },
];

const TreeComponent = () => {
  return (
    <div>
      <Tree data={treeData} />
    </div>
  );
};

export default TreeComponent;
