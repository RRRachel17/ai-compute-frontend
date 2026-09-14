import type { ComputeNode, GpuCard } from "../types";

export type ActiveGpuCell = {
  node: ComputeNode;
  card: GpuCard;
};
