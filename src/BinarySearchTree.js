const Queue = require("./Queue");

class BinarySearchTree {
  // your code here
  constructor(
    key = null,
    value = null,
    parent = null,
    left = null,
    right = null
  ) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      this.left == null
        ? (this.left = new BinarySearchTree(key, value, this))
        : this.left.insert(key, value);
    } else {
      this.right == null
        ? (this.right = new BinarySearchTree(key, value, this))
        : this.right.insert(key, value);
    }
  }

  find(key) {
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error("Key not found !!");
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        /* If the node only has a left child,
           then you replace the node with its left child. */
        this._replaceWith(this.left);
      } else if (this.right) {
        /* And similarly, if the node only has a right child,
           then you replace it with its right child. */
        this._replaceWith(this.right);
      } else {
        /* If the node has no children, then
           simply remove it and any references to it
           by calling `this._replaceWith(null)`. */
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Not Found");
    }
  }

  dfsInOrder(values = []) {
    //Fisrt, process the left node recursively
    if (this.left) {
      values = this.left.dfsInOrder(values);
    }
    //Next process the current values
    values.push(this.value);

    //finally, process the right node recursively
    if (this.right) {
      values = this.right.dfsInOrder(values);
    }

    return values;
  }

  dfsPreOrder(values = []) {
    //Next process the current values
    values.push(this.value);

    //Fisrt, process the left node recursively
    if (this.left) {
      this.left.dfsPreOrder(values);
    }

    //finally, process the right node recursively
    if (this.right) {
      this.right.dfsPreOrder(values);
    }
    return values;
  }

  dfsPostOrder(values = []) {
    //Fisrt, process the left node recursively
    if (this.left) {
      this.left.dfsPreOrder(values);
    }

    //finally, process the right node recursively
    if (this.right) {
      this.right.dfsPreOrder(values);
    }

    //Next process the current values
    values.push(this.value);
    return values;
  }

  bfs(tree, values = []) {
    //console.log(tree);
    const queue = new Queue();
    queue.enqueue(tree); // Start the traversal at the tree and add the tree node to the queue to kick off the BFS
    let node = queue.dequeue(); // Remove from the queue

    while (node) {
      values.push(node.value); // Add that value from the queue to an array
      console.log(values);
      if (node.left) {
        queue.enqueue(node.left); // Add the left child to the queue
      }
      if (node.right) {
        queue.enqueue(node.right); // Add the right child to the queue
      }
      node = queue.dequeue();
    }
    return values;
  }
}

const bst = new BinarySearchTree(5, 5);
bst.insert(2, 2);
bst.insert(19, 19);
bst.insert(15, 15);
bst.insert(28, 28);
bst.insert(18, 18);
//console.log(bst.right.left.right);
console.log(bst.bfs(bst));
