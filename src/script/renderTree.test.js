import { renderNode } from './renderTree';

describe('renderNode', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    it('should create a tree node element with correct attributes', () => {
        const node = { id: '1', name: 'Node 1', children: [] };
        renderNode(container, node);

        const nodeEl = container.querySelector('.tree-node');
        expect(nodeEl).not.toBeNull();
        expect(nodeEl.dataset.id).toBe('1');
        expect(nodeEl.draggable).toBe(true);
        expect(nodeEl.querySelector('span').textContent).toBe('Node 1');
    });

    it('should create a toggle button if node has children', () => {
        const node = { id: '1', name: 'Node 1', children: [{ id: '2', name: 'Child Node', children: [] }] };
        renderNode(container, node);

        const toggleButton = container.querySelector('.toggle-btn');
        expect(toggleButton).not.toBeNull();
        expect(toggleButton.dataset.expanded).toBe('true');
    });

    it('should not create a toggle button if node has no children', () => {
        const node = { id: '1', name: 'Node 1', children: [] };
        renderNode(container, node);

        const toggleButton = container.querySelector('.toggle-btn');
        expect(toggleButton).toBeNull();
    });

    it('should recursively render children nodes', () => {
        const node = { id: '1', name: 'Node 1', children: [{ id: '2', name: 'Child Node', children: [] }] };
        renderNode(container, node);

        const childrenContainer = container.querySelector('.children');
        expect(childrenContainer).not.toBeNull();
        expect(childrenContainer.dataset.id).toBe('children-1');

        const childNodeEl = childrenContainer.querySelector('.tree-node');
        expect(childNodeEl).not.toBeNull();
        expect(childNodeEl.dataset.id).toBe('2');
        expect(childNodeEl.querySelector('span').textContent).toBe('Child Node');
    });
});