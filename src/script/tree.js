/**
 * Represents the tree structure and handles its rendering, context menu, and drag-and-drop functionality.
 * 
 * @module Tree
 */

 /**
  * Tree data structure representing hospitals and their departments.
  * 
  * @typedef {Object} TreeNode
  * @property {number} id - Unique identifier for the node.
  * @property {string} name - Name of the node.
  * @property {TreeNode[]} children - Array of child nodes.
  */

 /**
  * Initializes the tree rendering, context menu, and drag-and-drop functionality.
  * 
  */

import { renderTree } from './renderTree.js';
import { showContextMenu, hideContextMenu } from './contextMenu.js';
import { setupDragAndDrop } from './dragAndDrop.js';

const treeData = [
  {
    id: 1,
    name: "Hospital A",
    children: [
      { id: 2, name: "Shoulder", children: [] },
      { id: 3, name: "Knee", children: [] },
      {
        id: 4,
        name: "Stomach",
        children: [
          { id: 5, name: "Crohn's Disease", children: [] },
          { id: 6, name: "Irritable Bowel Syndrome", children: [] },
          { id: 7, name: "Ulcerative Colitis", children: [] },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Hospital B",
    children: [
      { id: 9, name: "Gambling Addiction", children: [] },
      { id: 10, name: "Anxiety", children: [] },
      { id: 11, name: "Depression", children: [] },
    ],
  },
];

export function Tree() {
  const treeContainer = document.getElementById("tree-container");
  const contextMenuTemplate = document.getElementById("context-menu-template").content;

  // Initialize Tree Rendering
  renderTree(treeContainer, treeData);

  // Event Listeners
  treeContainer.addEventListener("click", (e) => {
    // Handle collapse/expand and context menu
    if (e.target.classList.contains("toggle-btn")) {
      const btn = e.target;
      const expanded = btn.dataset.expanded === "true";
      const nodeId = parseInt(btn.parentElement.dataset.id, 10);
      const childrenContainer = document.querySelector(`[data-id="children-${nodeId}"]`);

      if (childrenContainer) {
        childrenContainer.style.display = expanded ? "none" : "block";
        btn.textContent = expanded ? "+" : "-";
        btn.dataset.expanded = !expanded;
      }
    }

    const threeDots = e.target.closest(".three-dots");
    if (threeDots) {
      const nodeId = parseInt(threeDots.parentElement.dataset.id, 10);
      showContextMenu(e.clientX, e.clientY, nodeId, contextMenuTemplate, treeData);
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".context-menu") && !e.target.classList.contains("three-dots")) {
      hideContextMenu();
    }
  });

  // Initialize Drag and Drop
  setupDragAndDrop(treeContainer, treeData, renderTree);
}
