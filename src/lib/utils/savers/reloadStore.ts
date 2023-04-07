import { createGraph, createNode } from '../creators';
import type { GraphKey, NodeConfig } from '$lib/types';
import { createAnchor } from '../creators/createAnchor';

export function reloadStore(store: string) {
	const object = JSON.parse(store);
	console.log(object);
	const graph = createGraph(object.id as GraphKey, 1);
	console.log(graph);
	Object.entries(object.nodes).forEach(([id, node]) => {
		console.log(node);
		const nodeConfig: NodeConfig = node;
		const newNode = createNode(nodeConfig);
		console.log(newNode);
		Object.entries(node.anchors).forEach(([id, anchor]) => {
			const newAnchor = createAnchor(
				newNode,
				id as any,
				anchor.position,
				anchor.dimensions,
				anchor.input,
				anchor.direction,
				anchor.dynamic
			);
			newNode.anchors.add(newAnchor, id);
		});
		graph.nodes.add(newNode, id);
	});
	return graph;
}