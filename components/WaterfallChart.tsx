"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  ReferenceLine,
} from "recharts";
import { formatCurrency, WaterfallDataPoint } from "@/lib/cashflow-utils";

// ========================================
// CUSTOM TOOLTIP
// ========================================

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: WaterfallDataPoint;
  }>;
}

function WaterfallTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const displayValue = Math.abs(data.value);

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 shadow-[var(--shadow-lg)]">
      <p className="font-bold text-[var(--color-ink)] mb-2 text-base">{data.name}</p>
      <p className="text-sm text-[var(--color-ink-secondary)]">
        <span className="font-semibold">Valor:</span>{" "}
        <span className="font-bold text-lg text-[var(--color-ink)]">{formatCurrency(displayValue)}</span>
      </p>
    </div>
  );
}

// ========================================
// CUSTOM LABEL COMPONENT
// ========================================

interface CustomLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
  payload?: WaterfallDataPoint;
}

function CustomLabel({ x, y, width, value, payload }: CustomLabelProps) {
  // Only show label if value is not zero and we have valid coordinates
  if (value === undefined || value === 0 || Math.abs(value) < 0.01 || !x || !y || !width || !payload) return null;

  const absValue = Math.abs(value);
  const isPositive = value > 0;
  // Position label above positive bars, below negative bars
  const labelY = isPositive ? y - 8 : y + 20;
  const displayValue = formatCurrency(absValue);

  // Color based on type
  let labelColor = "var(--color-success)";
  if (payload.type === "expense") {
    labelColor = payload.name === "Gastos Fixos" ? "var(--color-ink-muted)" : "var(--color-warning)";
  } else if (payload.type === "balance" && value < 0) {
    labelColor = "var(--color-error)";
  }

  return (
    <text
      x={x + width / 2}
      y={labelY}
      fill={labelColor}
      textAnchor="middle"
      fontSize={11}
      fontWeight="bold"
      className="pointer-events-none"
    >
      {displayValue}
    </text>
  );
}

// ========================================
// FORMAT AXIS
// ========================================

function formatYAxisValue(value: number): string {
  const absValue = Math.abs(value);
  if (absValue >= 10000) return `€${(absValue / 1000).toFixed(0)}k`;
  if (absValue >= 1000) return `€${(absValue / 1000).toFixed(1)}k`;
  return `€${absValue}`;
}

// ========================================
// WATERFALL CHART COMPONENT
// ========================================

interface WaterfallChartProps {
  data: WaterfallDataPoint[];
}

export default function WaterfallChart({ data }: WaterfallChartProps) {
  if (data.length === 0) return null;

  // Build waterfall data properly - each bar starts where the previous ended
  let currentLevel = 0;
  const transformedData = data.map((point, index) => {
    if (point.type === "income") {
      // Income: from 0 to value (positive, going up)
      const incomeValue = point.value || 0;
      if (incomeValue === 0) {
        // If income is 0, bar should have 0 height
        const result = {
          ...point,
          value: 0,
          start: 0,
          end: 0, // Same as start = 0 height
        };
        currentLevel = 0;
        return result;
      }
      const result = {
        ...point,
        value: incomeValue,
        start: 0,
        end: incomeValue,
      };
      currentLevel = incomeValue;
      return result;
    } else if (point.type === "expense") {
      // Expenses: negative values going down from current level
      const expenseValue = point.value || 0;
      if (expenseValue === 0) {
        // If expense is 0, bar should have 0 height
        const result = {
          ...point,
          value: 0,
          start: currentLevel,
          end: currentLevel, // Same as start = 0 height
        };
        // currentLevel stays the same
        return result;
      }
      const newLevel = currentLevel - expenseValue;
      const result = {
        ...point,
        value: -expenseValue, // Negative to go down
        start: currentLevel, // Start at current level
        end: newLevel, // End at new (lower) level
      };
      currentLevel = newLevel;
      return result;
    } else {
      // Balance: shows final result
      // The balance should show the monthlyBalance value
      // If positive, goes up from 0; if negative, goes down from 0
      const balanceValue = point.value || 0;
      if (balanceValue === 0) {
        // If balance is 0, bar should have 0 height
        return {
          ...point,
          value: 0,
          start: 0,
          end: 0, // Same as start = 0 height
        };
      }
      const isPositive = balanceValue >= 0;
      const absValue = Math.abs(balanceValue);
      
      return {
        ...point,
        value: isPositive ? absValue : -absValue,
        start: 0,
        end: isPositive ? absValue : -absValue,
      };
    }
  });

  // Calculate min and max values for proper Y-axis scaling
  const allEndValues = transformedData.map((d) => d.end);
  const allStartValues = transformedData.map((d) => d.start);
  const allValues = [...allEndValues, ...allStartValues];
  const minValue = Math.min(...allValues, 0);
  const maxValue = Math.max(...allValues, 0);
  
  // Add padding to the domain
  const range = maxValue - minValue;
  const padding = range * 0.1;
  const domainMin = minValue - padding;
  const domainMax = maxValue + padding;

  const getBarColor = (entry: WaterfallDataPoint & { value: number }) => {
    if (entry.type === "income") return "var(--color-success)";
    if (entry.type === "expense") {
      if (entry.name === "Gastos Fixos") return "var(--color-ink-muted)";
      return "var(--color-warning)";
    }
    return entry.value >= 0 ? "var(--color-success)" : "var(--color-error)";
  };

  return (
    <div className="bg-[var(--color-surface)] rounded-xl p-4 sm:p-6 border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
      <h3 className="text-base sm:text-lg font-bold text-[var(--color-ink)] mb-3 sm:mb-4 text-center tracking-tight">
        Fluxo de Dinheiro
      </h3>
      
      <div className="h-[300px] sm:h-[400px] lg:h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transformedData}
            margin={{ top: 20, right: 10, left: 40, bottom: 40 }}
            barCategoryGap="35%"
            barGap={8}
          >
            {/* Grid lines - both horizontal and vertical */}
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} horizontal opacity={0.6} />

            <ReferenceLine y={0} stroke="var(--color-ink)" strokeWidth={2} opacity={0.8} label={{ value: "Zero", position: "right", fill: "var(--color-ink)", fontSize: 11, fontWeight: 600 }} />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "var(--color-ink)", fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: "var(--color-border)", strokeWidth: 2 }}
              dy={10}
              angle={0}
              textAnchor="middle"
              height={50}
              interval={0}
            />

            <YAxis
              tickFormatter={formatYAxisValue}
              tick={{ fontSize: 10, fill: "#6B7280", fontWeight: 500 }}
              tickLine={{ stroke: "#9CA3AF", strokeWidth: 1 }}
              axisLine={{ stroke: "#9CA3AF", strokeWidth: 2 }}
              width={50}
              dx={-5}
              domain={[domainMin, domainMax]}
              tickCount={6}
            />

            <Tooltip content={<WaterfallTooltip />} cursor={{ fill: "var(--color-accent)", opacity: 0.1, stroke: "var(--color-accent)", strokeWidth: 2 }} />

            {/* Base bar (invisible, for positioning) */}
            <Bar 
              dataKey="start" 
              stackId="stack" 
              fill="transparent"
              isAnimationActive={true}
              animationDuration={600}
              animationEasing="ease-out"
            >
              {transformedData.map((entry, index) => (
                <Cell key={`base-cell-${index}`} />
              ))}
            </Bar>

            {/* Value bar (colored) with labels */}
            <Bar 
              dataKey="value" 
              stackId="stack"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
              animationDuration={600}
              animationEasing="ease-out"
              maxBarSize={60}
            >
              {transformedData.map((entry, index) => {
                const color = getBarColor(entry);
                const isBalance = entry.type === "balance";

                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={color}
                    stroke={isBalance ? "#374151" : "none"}
                    strokeWidth={isBalance ? 2 : 0}
                    opacity={0.85}
                  />
                );
              })}
              <LabelList content={<CustomLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-[var(--color-success)]" />
          <span className="text-xs sm:text-sm font-semibold text-[var(--color-ink)]">Rendimento/Excedente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-[var(--color-ink-muted)]" />
          <span className="text-xs sm:text-sm font-semibold text-[var(--color-ink)]">Gastos Fixos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-[var(--color-warning)]" />
          <span className="text-xs sm:text-sm font-semibold text-[var(--color-ink)]">Gastos Variáveis</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-[var(--color-error)]" />
          <span className="text-xs sm:text-sm font-semibold text-[var(--color-ink)]">Défice</span>
        </div>
      </div>

      {/* Help text */}
      <p className="text-xs text-[var(--color-ink-muted)] text-center mt-3 sm:mt-4 px-4">
        Os valores são exibidos em cada barra. A linha preta horizontal indica o ponto zero.
      </p>
    </div>
  );
}
