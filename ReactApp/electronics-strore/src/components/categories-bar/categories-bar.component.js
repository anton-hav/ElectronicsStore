import React, { useState } from "react";
import { Box } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

import "./categories-bar.component.css";
import CategoryParameters from "../../types/url-parameters/category-filter.parameters";
import CustomTreeItem from "./custom-tree-item.component";

const data = {
  id: "100000",
  name: "All categories",
  children: [
    {
      id: "100100",
      name: "Electronics",
      children: [
        {
          id: "100101",
          name: "Headphones",
        },
        {
          id: "100102",
          name: "Camera & Photo",
        },
        {
          id: "100103",
          name: "Home Audio",
        },
      ],
    },
    {
      id: "100200",
      name: "Computers",
      children: [
        {
          id: "100201",
          name: "Computer Accessories & Peripherals",
        },
        {
          id: "100202",
          name: "Computer Components",
        },
        {
          id: "100203",
          name: "Data Storage",
        },
        {
          id: "100204",
          name: "Monitors",
        },
      ],
    },
    {
      id: "100300",
      name: "Smart Home",
    },
  ],
};

export default function CategoriesBar(props) {
  const { category } = props;

  const [selected, setSelected] = useState(() => {
    if (category === undefined || category === null) {
      return "100000";
    }
    return category;
  });

  const navigate = useNavigate();

  const generateUrlPath = (category) => {
    let url = new URL(window.location.href);
    let search = new URLSearchParams(url.search);
    const params = new CategoryParameters(selected);
    url.search = params.setParametersToUrl(search);
    let relativePath = url.pathname + url.search;
    return relativePath;
  };

  const handleSelect = (event, nodeId) => {
    let relativePath = generateUrlPath(nodeId);
    setSelected(nodeId);
    console.log("selected", nodeId);
    navigate(relativePath);
  };

  const renderTree = (nodes) => (
    <CustomTreeItem
      className="categories-item"
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </CustomTreeItem>
  );

  return (
    <Box>
      <TreeView
        className="categories-box"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["100000"]}
        defaultExpandIcon={<ChevronRightIcon />}
        selected={selected}
        onNodeSelect={handleSelect}
      >
        {renderTree(data)}
      </TreeView>
    </Box>
  );
}
