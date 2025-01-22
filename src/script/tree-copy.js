export function Tree(){
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
      
      const treeContainer = document.getElementById("tree-container");
      const contextMenuTemplate = document.getElementById("context-menu-template").content;
      function renderTree(container, nodes) {
        container.innerHTML = ""; // Clear container before rendering
        nodes.forEach((node) => renderNode(container, node));
      }
      
      // Helper: Render Node
      function renderNode(container, node) {
        const nodeEl = document.createElement("div");
        nodeEl.classList.add("tree-node");
        nodeEl.dataset.id = node.id;
        nodeEl.draggable = true;

        const toggleButton = node.children.length
        ? `<button class="toggle-btn" data-expanded="true">-</button>`
        : "";
            
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
      
      // Context Menu: Show
      function showContextMenu(x, y, nodeId) {
        hideContextMenu(); // Hide any existing menu
      
        const menu = contextMenuTemplate.cloneNode(true);
        const menuEl = menu.querySelector(".context-menu");
      
        menuEl.style.top = `${y}px`;
        menuEl.style.left = `${x}px`;
        menuEl.style.display = "block";
      
        document.body.appendChild(menuEl);
      
        // Attach event listener for menu actions
        menuEl.addEventListener("click", (e) => {
          handleContextMenuAction(e, nodeId);
        });
      }
      
      // Context Menu: Hide
      function hideContextMenu() {
        const menu = document.querySelector(".context-menu");
        if (menu) menu.remove();
      }
      
      // Context Menu Actions
      function handleContextMenuAction(event, nodeId) {
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
        renderTree(treeContainer, treeData);
      }
      
      // Helpers: Find Node by ID
      function findNodeById(nodes, id) {
        for (const node of nodes) {
          if (node.id === id) return node;
          const found = findNodeById(node.children, id);
          if (found) return found;
        }
        return null;
      }
      
      // Helpers: Remove Node by ID
      function removeNodeById(nodes, id) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === id) {
            nodes.splice(i, 1);
            return true;
          }
          if (removeNodeById(nodes[i].children, id)) return true;
        }
        return false;
      }
      
      // Event Listeners
      treeContainer.addEventListener("click", (e) => {
        // Handle collapse/expand
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
          showContextMenu(e.clientX, e.clientY, nodeId);
        }
      });
      
      // Hide context menu when clicking elsewhere
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".context-menu") && !e.target.classList.contains("three-dots")) {
          hideContextMenu();
        }
      });


    //   drag and drop
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


        function moveNode(tree, draggedId, targetId) {
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
          
      
      // Render Initial Tree
      renderTree(treeContainer, treeData);        
}
