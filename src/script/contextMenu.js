/**
 * @param {number} x - The x-coordinate where the context menu should appear.
 * @param {number} y - The y-coordinate where the context menu should appear.
 * @param {string} nodeId - The ID of the node for which the context menu is being shown.
 * @param {HTMLElement} contextMenuTemplate - The template element for the context menu.
 * @param {Object[]} treeData - The tree data structure.
 */

/**
 * @param {Event} event - The event object from the context menu action.
 * @param {string} nodeId - The ID of the node on which the action is performed.
 * @param {Object[]} treeData - The tree data structure.
 */

import { findNodeById, removeNodeById } from './utils.js';
import { renderTree } from './renderTree.js';
export function showContextMenu(x, y, nodeId, contextMenuTemplate, treeData) {
  hideContextMenu(); // Hide any existing menu

  const menu = contextMenuTemplate.cloneNode(true);
  const menuEl = menu.querySelector(".context-menu");

  menuEl.style.top = `${y}px`;
  menuEl.style.left = `${x}px`;
  menuEl.style.display = "block";

  document.body.appendChild(menuEl);

  // Attach event listener for menu actions
  menuEl.addEventListener("click", (e) => {
    handleContextMenuAction(e, nodeId, treeData);
  });
}

export function hideContextMenu() {
  const menu = document.querySelector(".context-menu");
  if (menu) menu.remove();
}

export function handleContextMenuAction(event, nodeId, treeData) {
    const action = event.target.dataset.action;
    const node = findNodeById(treeData, nodeId);
  
    if (!node) {
      alert("Node not found!");
      return;
    }
  
    switch (action) {
      case "edit":
        const newName = prompt("Enter new name:", node.name);
        if (newName && newName.trim()) {
          node.name = newName;
          alert("Group updated successfully!");
        } else {
          alert("Invalid name.");
        }
        break;
  
      case "add-child":
        const childName = prompt("Enter child group name:");
        if (childName && childName.trim()) {
          node.children.push({ id: Date.now(), name: childName, children: [] });
          alert("Child group added successfully!");
        } else {
          alert("Invalid name.");
        }
        break;
  
      case "remove":
        if (node.children.length) {
          alert("Cannot delete a group with children.");
        } else {
          removeNodeById(treeData, nodeId);
          alert("Group removed successfully!");
        }
        break;
  
      default:
        alert("Invalid action.");
    }
  
    hideContextMenu();
    renderTree(document.getElementById("tree-container"), treeData);
  }
  
