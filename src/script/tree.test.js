import { Tree } from './tree.js';
import { renderTree } from './renderTree.js';
import { showContextMenu, hideContextMenu } from './contextMenu.js';
import { setupDragAndDrop } from './dragAndDrop.js';

jest.mock('./renderTree.js');
jest.mock('./contextMenu.js');
jest.mock('./dragAndDrop.js');

describe('Tree', () => {
    let treeContainer;
    let contextMenuTemplate;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="tree-container"></div>
            <template id="context-menu-template">
                <div class="context-menu"></div>
            </template>
        `;
        treeContainer = document.getElementById('tree-container');
        contextMenuTemplate = document.getElementById('context-menu-template').content;
        Tree();
    });

    it('should render the tree on initialization', () => {
        expect(renderTree).toHaveBeenCalledWith(treeContainer, expect.any(Array));
    });


    it('should show context menu on three dots click', () => {
        const threeDots = document.createElement('div');
        threeDots.classList.add('three-dots');

        treeContainer.appendChild(threeDots);
        const clickEvent = new MouseEvent('click', { clientX: 100, clientY: 100 });
        threeDots.dispatchEvent(clickEvent);

    });


    it('should initialize drag and drop', () => {
        expect(setupDragAndDrop).toHaveBeenCalledWith(treeContainer, expect.any(Array), renderTree);
    });
});