/**
 * Sets up drag-and-drop functionality for a tree structure.
 *
 * @param {HTMLElement} treeContainer - The container element for the tree.
 * @param {Array} treeData - The data representing the tree structure.
 * @param {Function} renderTree - A function to re-render the tree.
 */
import { moveNode } from './utils.js';

export function setupDragAndDrop(treeContainer, treeData, renderTree) {
    let draggedNodeId = null;
  
    treeContainer.addEventListener("dragstart", (e) => {
      const node = e.target.closest(".tree-node");
      if (node) {
        draggedNodeId = parseInt(node.dataset.id, 10); // Store the dragged node's ID
        e.dataTransfer.setData("text/plain", node.dataset.id); // Optional
      }
    });
  
    treeContainer.addEventListener("dragover", (e) => {
      e.preventDefault(); // Allow dropping
      const targetNode = e.target.closest(".tree-node");
      if (targetNode && targetNode.dataset.id !== String(draggedNodeId)) {
        targetNode.classList.add("drag-over"); // Add a visual cue
      }
    });
  
    treeContainer.addEventListener("dragleave", (e) => {
      const targetNode = e.target.closest(".tree-node");
      if (targetNode) {
        targetNode.classList.remove("drag-over"); // Remove the visual cue
      }
    });
  
    treeContainer.addEventListener("drop", (e) => {
      e.preventDefault();
      const targetNode = e.target.closest(".tree-node");
      if (targetNode && targetNode.dataset.id !== String(draggedNodeId)) {
        const targetNodeId = parseInt(targetNode.dataset.id, 10);
        // Perform the move operation
        moveNode(treeData, draggedNodeId, targetNodeId);
        // Re-render the tree
        renderTree(treeContainer, treeData);
      }
    });
  }
  