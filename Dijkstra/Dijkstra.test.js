const ADT = require('adt');
const dijkstra = require('./Dijkstra');
const Graph = ADT.Graph;

const rows = 5;
const columns = 5;
const graph = new Graph();

const matrix = [
    [0, 5, 2, 8, 10],
    [4, 10, 4, 3, 8],
    [1, 6, 3, 1, 9],
    [10, 3, 6, 8, 1],
    [5, 10, 4, 9, 9],
];

const answer = [
    '4_4',
    '3_4',
    '2_3',
    '1_2',
    '0_1',
    '0_0',
];

// Then build the graph based on our matrix
// Important! First fill graph with vertices
for (let j = 0; j < columns; j++) {
    for (let i = 0; i < rows; i++) {
        graph.addVertex(`${j}_${i}`);
    }
}

// And only then all vertices added, build the edges between them
for (let j = 0; j < columns; j++) {
    for (let i = 0; i < rows; i++) {
        for (let k = (j - 1); k <= (j + 1); k++) {
            if (k < 0 || k > (columns - 1)) continue;

            for (let l = (i - 1); l <= (i + 1); l++) {
                if (l === i && k === j) continue;
                if (l < 0 || l > (rows - 1)) continue;

                graph.addEdge(`${j}_${i}`, `${k}_${l}`, matrix[j][i] + matrix[k][l]);
            }
        }
    }
}

test('basic Dijkstra test for matrix 5 x 5', () => {
    const algorithmAnswer = [];
    const start = graph.getVertex('0_0');

    // TODO dijkstra must return new graph, do not modify existing
    dijkstra(graph, start);

    let destination = graph.getVertex('4_4');
    algorithmAnswer.push(destination.id);

    while (destination.predecessor && answer.length) {
        algorithmAnswer.push(destination.predecessor.id);

        destination = destination.predecessor;
    }

    expect(algorithmAnswer).toEqual(answer);
});
