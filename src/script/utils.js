export function findNodeById(nodes, id) {
    for (const node of nodes) {
      if (node.id === id) return node;
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
    return null;
  }
  
  export function removeNodeById(nodes, id) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        nodes.splice(i, 1);
        return true;
      }
      if (removeNodeById(nodes[i].children, id)) return true;
    }
    return false;
  }
  
  export function moveNode(tree, draggedId, targetId) {
    let draggedNode = null;
  
    // Find and remove the dragged node
    function findAndRemoveNode(nodes, id) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === id) {
          draggedNode = nodes.splice(i, 1)[0];
          return true;
        }
        if (findAndRemoveNode(nodes[i].children, id)) return true;
      }
      return false;
    }
  
    // Find the target node and add the dragged node as its child
    function findAndAddNode(nodes, id) {
      for (const node of nodes) {
        if (node.id === id) {
          node.children.push(draggedNode);
          return true;
        }
        if (findAndAddNode(node.children, id)) return true;
      }
      return false;
    }
  
    findAndRemoveNode(tree, draggedId);
    if (draggedNode) {
      findAndAddNode(tree, targetId);
    }
  }
  