import { get } from "../api/request";
import type { ComputeNode, GpuCard } from "../types";

type ApiGpuCard = GpuCard & {
  nodeId?: string;
  nodeID?: string;
  node_id?: string;
};

function getCardNodeId(card: ApiGpuCard) {
  return card.nodeId ?? card.nodeID ?? card.node_id;
}

function normalizeGpuCard(card: ApiGpuCard): GpuCard {
  return {
    index: card.index,
    utilization: card.utilization,
    memoryPercent: card.memoryPercent,
    temperature: card.temperature,
    status: card.status,
  };
}

function mergeGpuCards(nodes: ComputeNode[], cards: ApiGpuCard[]) {
  const cardsByNodeId = new Map<string, GpuCard[]>();

  cards.forEach((card) => {
    const nodeId = getCardNodeId(card);
    if (!nodeId) {
      return;
    }

    const nodeCards = cardsByNodeId.get(nodeId) ?? [];
    nodeCards.push(normalizeGpuCard(card));
    cardsByNodeId.set(nodeId, nodeCards);
  });

  return nodes.map((node) => ({
    ...node,
    cards: cardsByNodeId.get(node.id) ?? node.cards,
  }));
}

export function listComputeNodes() {
  return get<ComputeNode[]>("/api/v1/compute-nodes");
}

export function listGpuCards() {
  return get<ApiGpuCard[]>("/api/v1/gpu-cards");
}

export async function listHeatmapNodes() {
  const nodes = await listComputeNodes();

  try {
    const cards = await listGpuCards();
    return mergeGpuCards(nodes, cards);
  } catch (error) {
    console.error(error);
    return nodes;
  }
}
