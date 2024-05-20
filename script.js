const readline = require('readline');

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addNode(value) {
    if (!this.adjacencyList[value]) {
      this.adjacencyList[value] = [];
      console.log(`Node ${value} added.`);
    } else {
      console.log(`Node ${value} already exists.`);
    }
  }

  removeNode(value) {
    if (this.adjacencyList[value]) {
      delete this.adjacencyList[value];
      for (let node in this.adjacencyList) {
        this.adjacencyList[node] = this.adjacencyList[node].filter(
          (v) => v !== value
        );
      }
      console.log(`Node ${value} removed.`);
    } else {
      console.log(`Node ${value} does not exist.`);
    }
  }

  addEdge(node1, node2) {
    if (this.adjacencyList[node1] && this.adjacencyList[node2]) {
      this.adjacencyList[node1].push(node2);
      this.adjacencyList[node2].push(node1);
      console.log(`Edge between ${node1} and ${node2} added.`);
    } else {
      console.log(`One or both nodes do not exist.`);
    }
  }

  removeEdge(node1, node2) {
    if (this.adjacencyList[node1] && this.adjacencyList[node2]) {
      this.adjacencyList[node1] = this.adjacencyList[node1].filter(
        (v) => v !== node2
      );
      this.adjacencyList[node2] = this.adjacencyList[node2].filter(
        (v) => v !== node1
      );
      console.log(`Edge between ${node1} and ${node2} removed.`);
    } else {
      console.log(`One or both nodes do not exist.`);
    }
  }

  bfs(start) {
    if (!this.adjacencyList[start]) {
      console.log(`Node ${start} does not exist.`);
      return;
    }

    const queue = [start];
    const result = [];
    const visited = {};
    let currentNode;

    visited[start] = true;

    while (queue.length) {
      currentNode = queue.shift();
      result.push(currentNode);

      this.adjacencyList[currentNode].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }

    console.log(`BFS starting from ${start}:`, result.join(" "));
    return result;
  }

  dfs(start) {
    if (!this.adjacencyList[start]) {
      console.log(`Node ${start} does not exist.`);
      return;
    }

    const stack = [start];
    const result = [];
    const visited = {};
    let currentNode;

    visited[start] = true;

    while (stack.length) {
      currentNode = stack.pop();
      result.push(currentNode);

      this.adjacencyList[currentNode].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }

    console.log(`DFS starting from ${start}:`, result.join(" "));
    return result;
  }
}

const graph = new Graph();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const menu = () => {
  console.log(`
Choose an option:
1. Add node
2. Remove node
3. Add edge
4. Remove edge
5. BFS
6. DFS
7. Exit
`);
  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        rl.question('Enter node value: ', (value) => {
          graph.addNode(value);
          menu();
        });
        break;
      case '2':
        rl.question('Enter node value: ', (value) => {
          graph.removeNode(value);
          menu();
        });
        break;
      case '3':
        rl.question('Enter node1 and node2 values separated by a space: ', (input) => {
          const [node1, node2] = input.split(' ');
          graph.addEdge(node1, node2);
          menu();
        });
        break;
      case '4':
        rl.question('Enter node1 and node2 values separated by a space: ', (input) => {
          const [node1, node2] = input.split(' ');
          graph.removeEdge(node1, node2);
          menu();
        });
        break;
      case '5':
        rl.question('Enter starting node for BFS: ', (start) => {
          graph.bfs(start);
          menu();
        });
        break;
      case '6':
        rl.question('Enter starting node for DFS: ', (start) => {
          graph.dfs(start);
          menu();
        });
        break;
      case '7':
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please enter a number from 1 to 7.');
        menu();
    }
  });
};

menu();
