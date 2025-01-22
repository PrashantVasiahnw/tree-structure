/**
 * Tests for the removeNodeById function.
 * 
 * The removeNodeById function is expected to:
 * - Remove a node with a given id from a list of nodes.
 * - Return true if the node was successfully removed.
 * - Return false if the node with the given id was not found.
 * - Handle nested children nodes.
 * 
 * Test cases:
 * - Should remove the node with the given id from the top-level nodes.
 * - Should return false if the node with the given id is not found in the top-level nodes.
 * - Should remove the node with the given id from nested children nodes.
 * - Should return false if the node with the given id is not found in nested children nodes.
 */
import { removeNodeById } from './utils';

describe('removeNodeById', () => {
    it('should remove the node with the given id', () => {
        const nodes = [
            { id: 1, children: [] },
            { id: 2, children: [] },
            { id: 3, children: [] }
        ];
        const result = removeNodeById(nodes, 2);
        expect(result).toBe(true);
        expect(nodes).toEqual([
            { id: 1, children: [] },
            { id: 3, children: [] }
        ]);
    });

    it('should return false if the node with the given id is not found', () => {
        const nodes = [
            { id: 1, children: [] },
            { id: 2, children: [] },
            { id: 3, children: [] }
        ];
        const result = removeNodeById(nodes, 4);
        expect(result).toBe(false);
        expect(nodes).toEqual([
            { id: 1, children: [] },
            { id: 2, children: [] },
            { id: 3, children: [] }
        ]);
    });

    it('should remove the node with the given id from nested children', () => {
        const nodes = [
            { id: 1, children: [
                { id: 2, children: [] },
                { id: 3, children: [] }
            ]},
            { id: 4, children: [] }
        ];
        const result = removeNodeById(nodes, 3);
        expect(result).toBe(true);
        expect(nodes).toEqual([
            { id: 1, children: [
                { id: 2, children: [] }
            ]},
            { id: 4, children: [] }
        ]);
    });

    it('should return false if the node with the given id is not found in nested children', () => {
        const nodes = [
            { id: 1, children: [
                { id: 2, children: [] },
                { id: 3, children: [] }
            ]},
            { id: 4, children: [] }
        ];
        const result = removeNodeById(nodes, 5);
        expect(result).toBe(false);
        expect(nodes).toEqual([
            { id: 1, children: [
                { id: 2, children: [] },
                { id: 3, children: [] }
            ]},
            { id: 4, children: [] }
        ]);
    });
});