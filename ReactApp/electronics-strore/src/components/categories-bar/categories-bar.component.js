import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

import "./categories-bar.component.css";
import CategoryParameters from "../../types/url-parameters/category-filter.parameters";
import CustomTreeItem from "./custom-tree-item.component";
// Import services
import CategoryService from "../../services/category.service";
// Import custom types and utils
import CategoryDto from "../../types/dto/category.dto";

const _categoryService = new CategoryService();

export default function CategoriesBar(props) {
  const { category } = props;
  const [categoriesTree, setcategoriesTree] = useState();
  const [expandedNodes, setExpandedNodes] = useState([]);

  const [selected, setSelected] = useState(() => {
    if (category.categoryId === undefined || category.categoryId === null) {
      return categoriesTree ? categoriesTree.id : null;
    }
    return category.categoryId;
  });

  useEffect(() => {
    /**
     * Generates a category tree by default.
     * Loads the root category and its childrens.
     */
    async function setRootCategory() {
      let rootCategory = await _categoryService.getRootCategoryFromApi();
      const children = await _categoryService.getCategoriesByParentIdFromApi(
        rootCategory.id
      );
      rootCategory.children = children;
      setcategoriesTree(rootCategory);
      if (selected !== null) {
        setSelected(rootCategory.id);
      }
    }

    /**
     * Generates a category tree for the selected category.
     * This function is only used when passing a category identifier through a URL (props).
     */
    async function setTreeForPropCategory() {
      // Builds the category tree based on the received category Id (category props).
      // Generates an array of expanded node values.
      let cat = await _categoryService.getCategoryByIdFromApi(
        category.categoryId
      );
      const value = await generateCategoryTreeByCategory(cat);
      let tree = value.tree;
      let expanded = value.expanded;
      setcategoriesTree(tree);
      setExpandedNodes(expanded);
      if (selected !== null) {
        setSelected(category.categoryId);
      }
    }

    if (categoriesTree === undefined) {
      if (category !== undefined && category.categoryId !== null) {
        setTreeForPropCategory();
      } else {
        setRootCategory();
      }
    }
  });

  const navigate = useNavigate();

  /**
   * Generates a category tree and an array of extended nodes.
   * Performs recursion from the current category to the root category.
   * @param {CategoryDto} category - current category node of the tree.
   * @returns object with a category tree and an array of extended categories as properties.
   */
  const generateCategoryTreeByCategory = async (category) => {
    let tree = null;
    let expanded = [];
    if (category.parentId === null) {
      tree = category;
    } else {
      let parent = await _categoryService.getCategoryByIdFromApi(
        category.parentId
      );

      parent = await loadChildren(parent);
      parent.children = await Promise.all(
        parent.children.map(async (child) => await loadChildren(child))
      );
      let index = parent.children.findIndex((c) => c.id === category.id);
      parent.children[index] = category;
      expanded.push(parent.id);
      const value = await generateCategoryTreeByCategory(parent);
      tree = value.tree;
      expanded.push(...value.expanded);
    }
    return { tree: tree, expanded: expanded };
  };

  const generateUrlPath = (category) => {
    let url = new URL(window.location.href);
    // Changing a category resets the pagination and other filters.
    // If you want to leave the whole query string unchanged,
    // pass "url.search" to the constructor of the URLSearchParams object.
    let search = new URLSearchParams();
    const params = new CategoryParameters(category);
    url.search = params.setParametersToUrl(search);
    let relativePath = url.pathname + url.search;
    return relativePath;
  };

  /**
   * Handles category selection events
   * @param {*} event - React select event
   * @param {*} nodeId - id of the selected category
   */
  const handleSelect = (event, nodeId) => {
    let relativePath = generateUrlPath(nodeId);
    setSelected(nodeId);
    navigate(relativePath);
  };

  /**
   * Finds child node in categories with specified unique identifier.
   * @param {*} nodeId - child node unique identifier.
   * @param {*} node - root node
   * @returns a link to the child node matching the given identifier
   */
  const findNodeById = (nodeId, node) => {
    // The search is recursive. The search method should be optimized
    // if there are a large number of categories. Breaking recursion
    // when a node is found successfully will increase performance.
    let result = undefined;
    if (node.id === nodeId) {
      result = node;
    } else if (node.children.length > 0) {
      let childResult = node.children.map((child) =>
        findNodeById(nodeId, child)
      );
      result = childResult.find((r) => r !== undefined);
    }
    return result;
  };

  /**
   * Uploads child categories for current node of the categories tree.
   * @param {*} node - current node of the categories tree.
   * @returns - node with the child categories (if thay exist).
   */
  const loadChildren = async (node) => {
    if (node.children.length === 0) {
      const children = await _categoryService.getCategoriesByParentIdFromApi(
        node.id
      );
      node.children = children;
    }
    return node;
  };

  /**
   * Handles expand and collapse categories tree nodes.
   * Uploads child categories for all children of the last expanded tree node.
   * @param {*} event - React event
   * @param {*} nodeIds - array of expanded node ids.
   */
  const handleToggle = async (event, nodeIds) => {
    setExpandedNodes(nodeIds);
    let lastExpandedNodeId = nodeIds[0];
    let rootCategory = categoriesTree.clone();
    let node = findNodeById(lastExpandedNodeId, rootCategory);
    node.children = await Promise.all(
      node.children.map(async (child) => await loadChildren(child))
    );
    setcategoriesTree(rootCategory);
  };

  /**
   * Render the categories tree.
   * @param {*} nodes
   * @returns React Tree component represent categories tree.
   */
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
        expanded={expandedNodes}
        defaultExpandIcon={<ChevronRightIcon />}
        selected={selected}
        onNodeSelect={handleSelect}
        onNodeToggle={handleToggle}
      >
        {categoriesTree !== undefined ? renderTree(categoriesTree) : null}
      </TreeView>
    </Box>
  );
}
