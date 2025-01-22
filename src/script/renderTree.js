/**
 * Renders a tree structure inside a given container.
 *
 * @param {HTMLElement} container - The container element where the tree will be rendered.
 * @param {Array} nodes - An array of node objects representing the tree structure.
 */

/**
 * Renders a single node and its children inside a given container.
 *
 * @param {HTMLElement} container - The container element where the node will be rendered.
 * @param {Object} node - The node object containing information about the node.
 * @param {string} node.id - The unique identifier of the node.
 * @param {string} node.name - The name of the node.
 * @param {Array} node.children - An array of child node objects.
 */

export function renderTree(container, nodes) {
    container.innerHTML = ""; // Clear container before rendering
    nodes.forEach((node) => renderNode(container, node));
  }
  
  export function renderNode(container, node) {
    const nodeEl = document.createElement("div");
    nodeEl.classList.add("tree-node");
    nodeEl.dataset.id = node.id;
    nodeEl.draggable = true;
  
    const toggleButton = node.children.length ? `<button class="toggle-btn" data-expanded="true">-</button>` : "";
  
    nodeEl.innerHTML = `
      ${toggleButton}
      <span>${node.name}</span>
      <span class="three-dots">⋮</span>
    `;
  
    container.appendChild(nodeEl);
  
    // Recursively render children
    if (node.children.length) {
      const childrenContainer = document.createElement("div");
      childrenContainer.classList.add("children");
      childrenContainer.dataset.id = `children-${node.id}`;
      node.children.forEach((child) => renderNode(childrenContainer, child));
      container.appendChild(childrenContainer);
    }
  }
  