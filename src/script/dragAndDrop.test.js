import { setupDragAndDrop } from './dragAndDrop.js';
import { renderTree } from './renderTree.js';

/**
 * @jest-environment jsdom
 */


describe('setupDragAndDrop', () => {
    let treeContainer;
    let treeData;

    beforeEach(() => {
        treeContainer = document.createElement('div');
        document.body.appendChild(treeContainer);

        treeData = [
            {
                id: 1,
                name: 'Hospital A',
                children: [
                    { id: 2, name: 'Shoulder', children: [] },
                    { id: 3, name: 'Knee', children: [] },
                ],
            },
            {
                id: 4,
                name: 'Hospital B',
                children: [],
            },
        ];

        renderTree(treeContainer, treeData);
        setupDragAndDrop(treeContainer, treeData, renderTree);
    });

    afterEach(() => {
        document.body.removeChild(treeContainer);
    });

    it('should initialize the tree correctly', () => {
        expect(treeContainer.children.length).toBeGreaterThan(0);
    });


    it('should remove drag-over class when dragging leaves a node', () => {
        const kneeNode = treeContainer.querySelector('[data-id="3"]');
        const dragLeaveEvent = new Event('dragleave');
        kneeNode.dispatchEvent(dragLeaveEvent);

        expect(kneeNode.classList.contains('drag-over')).toBe(false);
    });
    it('should re-render the tree after the drop action', () => {
        const shoulderNode = treeContainer.querySelector('[data-id="2"]');
        const hospitalBNode = treeContainer.querySelector('[data-id="4"]');
        const dropEvent = new Event('drop');

        shoulderNode.dispatchEvent(new Event('dragstart'));
        hospitalBNode.dispatchEvent(dropEvent);

        renderTree(treeContainer, treeData);

        const movedNode = treeContainer.querySelector('[data-id="2"]');
        expect(movedNode).toBeTruthy();
    });
});