import React from "react";
import TreeComponent from "./tree";

const DecisionTree = ({ stock }) => {
  return (
    <div className="container p-4 mx-auto">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stock.map((stock, index) => (
          <div key={index} className="p-4 bg-white border rounded-lg shadow-md">
            <TreeComponent stock={stock} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecisionTree;
