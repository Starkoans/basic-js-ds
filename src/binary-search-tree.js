const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	constructor() {
		this._root = null;
	}

	root() {
		return this._root;
	}

	add(data) {
		const newNode = new Node(data);

		if (this._root === null) {
			this._root = newNode;
			return;
		}

		const addNode = (currentNode) => {
			if (data === currentNode.data) {
				return;
			}

			if (data < currentNode.data) {
				if (currentNode.left === null) {
					currentNode.left = newNode;
				} else {
					addNode(currentNode.left);
				}
			} else {
				if (currentNode.right === null) {
					currentNode.right = newNode;
				} else {
					addNode(currentNode.right);
				}
			}
		};

		addNode(this._root);
	}

	has(data) {
		return this.find(data) !== null;
	}

	find(data) {
		const searchNode = (currentNode) => {
			if (currentNode === null) {
				return null;
			}

			if (data === currentNode.data) {
				return currentNode;
			}

			if (data < currentNode.data) {
				return searchNode(currentNode.left);
			} else {
				return searchNode(currentNode.right);
			}
		};

		return searchNode(this._root);
	}

	remove(data) {
		const removeNode = (currentNode, data) => {
			if (currentNode === null) {
				return null;
			}

			if (data === currentNode.data) {

				if (currentNode.left === null && currentNode.right === null) {
					return null;
				}

				if (currentNode.left === null) {
					return currentNode.right;
				}

				if (currentNode.right === null) {
					return currentNode.left;
				}

				let minRight = currentNode.right;
				while (minRight.left !== null) {
					minRight = minRight.left;
				}
				currentNode.data = minRight.data;
				currentNode.right = removeNode(currentNode.right, minRight.data);
				return currentNode;
			} else if (data < currentNode.data) {
				currentNode.left = removeNode(currentNode.left, data);
				return currentNode;
			} else {
				currentNode.right = removeNode(currentNode.right, data);
				return currentNode;
			}
		};

		this._root = removeNode(this._root, data);
	}

	min() {
		if (this._root === null) {
			return null;
		}

		let currentNode = this._root;
		while (currentNode.left !== null) {
			currentNode = currentNode.left;
		}
		return currentNode.data;
	}

	max() {
		if (this._root === null) {
			return null;
		}

		let currentNode = this._root;
		while (currentNode.right !== null) {
			currentNode = currentNode.right;
		}
		return currentNode.data;
	}
}

module.exports = {
	BinarySearchTree,
};
