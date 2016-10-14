const ADT = require('adt');
const BinaryHeapStore = ADT.BinaryHeap.BinaryHeapStore;

module.exports = function dijkstra(graph, start) {
    start.distance = 0;

    const binaryHeap = new BinaryHeapStore(graph.map((vertex) => [vertex.distance, vertex]));

    while (binaryHeap.length > 0) {
        const currentVertex = binaryHeap.pop()[1];
        const vertexConnections = currentVertex.getConnections();

        Object.keys(vertexConnections).forEach((vertexId) => {
            const nextVertex = vertexConnections[vertexId].vertex;
            const newDistance = currentVertex.distance + currentVertex.getWeight(nextVertex);

            if (newDistance < nextVertex.distance) {
                nextVertex.distance = newDistance;
                nextVertex.predecessor = currentVertex;

                binaryHeap.decreaseItemValue(nextVertex, newDistance);
            }

        });
    }
};
