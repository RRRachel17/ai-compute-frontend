"use client";

import { useEffect, useMemo, useRef } from "react";
import * as echarts from "echarts/core";
import { GridComponent, VisualMapComponent, type GridComponentOption, type VisualMapComponentOption } from "echarts/components";
import { HeatmapChart, type HeatmapSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import type { ComputeNode, GpuCard } from "../types";
import type { ActiveGpuCell } from "./types";

echarts.use([GridComponent, VisualMapComponent, HeatmapChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | VisualMapComponentOption | HeatmapSeriesOption
>;

type GpuHeatmapProps = {
  nodes: ComputeNode[];
  onCellHover?: (cell: ActiveGpuCell) => void;
  onCellLeave?: () => void;
};

export default function GpuHeatmap({ nodes, onCellHover, onCellLeave }: GpuHeatmapProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const chartData = useMemo(() => {
    const maxGpuCount = Math.max(...nodes.map((node) => node.gpuCount));
    const xLabels = Array.from({ length: maxGpuCount }, (_, index) => `GPU ${index}`);
    const yLabels = nodes.map((node) => node.name);
    const points = nodes.flatMap((node) =>
      node.cards.map((card) => ({
        value: [`GPU ${card.index}`, node.name, card.utilization],
        node,
        card,
      })),
    );
    const poolSummary = ["H100", "A100", "L40S"].map((pool) => ({
      pool,
      count: nodes.filter((node) => node.pool === pool).length,
    }));

    return { poolSummary, points, xLabels, yLabels };
  }, [nodes]);

  useEffect(() => {
    const container = chartRef.current;
    if (!container) {
      return;
    }

    const chart = echarts.init(container, null, { renderer: "canvas" });
    const option: EChartsOption = {
      grid: {
        top: 58,
        right: 30,
        bottom: 58,
        left: 82,
      },
      xAxis: {
        name: "节点内 GPU 卡号",
        nameLocation: "middle",
        nameGap: 34,
        type: "category",
        data: chartData.xLabels,
        splitArea: {
          show: true,
          areaStyle: {
            color: ["#ffffff", "#fbfcfe"],
          },
        },
        splitLine: { lineStyle: { color: "#e8edf3" } },
        axisLine: { lineStyle: { color: "#e3e8ef" } },
        axisTick: { show: false },
        axisLabel: {
          color: "#6e7180",
          fontSize: 12,
        },
        nameTextStyle: { color: "#6e7180", fontSize: 12 },
      },
      yAxis: {
        name: "计算节点",
        nameLocation: "middle",
        nameGap: 72,
        type: "category",
        data: chartData.yLabels,
        inverse: true,
        splitArea: {
          show: true,
          areaStyle: {
            color: ["#ffffff", "#fbfcfe"],
          },
        },
        splitLine: { lineStyle: { color: "#e8edf3" } },
        axisLine: { lineStyle: { color: "#e3e8ef" } },
        axisTick: { show: false },
        axisLabel: {
          color: "#6e7180",
          fontSize: 10,
          interval: 1,
        },
        nameTextStyle: { color: "#6e7180", fontSize: 12 },
      },
      visualMap: {
        min: 0,
        max: 100,
        orient: "horizontal",
        left: 82,
        bottom: 12,
        itemHeight: 220,
        itemWidth: 12,
        calculable: false,
        text: ["高", "低"],
        textStyle: { color: "#6e7180" },
        inRange: {
          color: ["#f1f5f9", "#dff4ff", "#8dd6ff", "#fef2f8", "#e8007b"],
        },
      },
      series: [
        {
          name: "GPU 使用率",
          type: "heatmap",
          data: chartData.points,
          coordinateSystem: "cartesian2d",
          label: {
            show: false,
            color: "#1d1d23",
            fontSize: 11,
            fontWeight: 600,
            formatter: (params) => `${(params.value as [string, string, number])[2]}%`,
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: "#ffffff",
            borderRadius: 6,
          },
          emphasis: {
            itemStyle: {
              borderColor: "#f8b2d7",
              borderWidth: 4,
              shadowBlur: 18,
              shadowColor: "rgba(232, 0, 123, 0.16)",
            },
          },
        },
      ],
    };

    chart.setOption(option);
    chart.on("mouseover", (params) => {
      const data = params.data as { node?: ComputeNode; card?: GpuCard } | undefined;
      if (data?.node && data.card) {
        onCellHover?.({ node: data.node, card: data.card });
      }
    });
    chart.on("globalout", () => {
      onCellLeave?.();
    });

    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
  }, [chartData, onCellHover, onCellLeave]);

  return (
    <div className="relative h-[600px] overflow-hidden rounded-[20px] border border-[#e3e8ef] bg-white shadow-[0_14px_40px_rgba(29,29,35,0.04)]">
      <div className="absolute right-5 top-5 z-10 flex items-center gap-2 rounded-full border border-[#e3e8ef] bg-white/95 px-4 py-2 text-xs text-[#6e7180] shadow-[0_10px_28px_rgba(29,29,35,0.06)]">
        {chartData.poolSummary.map((item) => (
          <span key={item.pool} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#e8007b]" />
            {item.pool} {item.count}
          </span>
        ))}
      </div>

      <div ref={chartRef} className="h-full w-full" />
    </div>
  );
}
