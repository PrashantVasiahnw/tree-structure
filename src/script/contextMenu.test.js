import { hideContextMenu } from './contextMenu.js';

describe('hideContextMenu', () => {
    beforeEach(() => {
        // Set up our document body
        document.body.innerHTML = `
            <div class="context-menu"></div>
        `;
    });

    afterEach(() => {
        // Clean up the document body
        document.body.innerHTML = '';
    });

    test('should remove the context menu if it exists', () => {
        hideContextMenu();
        const menu = document.querySelector('.context-menu');
        expect(menu).toBeNull();
    });

    test('should do nothing if the context menu does not exist', () => {
        document.querySelector('.context-menu').remove();
        hideContextMenu();
        const menu = document.querySelector('.context-menu');
        expect(menu).toBeNull();
    });
});