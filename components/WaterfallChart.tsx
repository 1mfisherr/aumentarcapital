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

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-lg">
      <p className="font-bold text-neutral-900 mb-2">{data.name}</p>
      <p className="text-sm text-neutral-600">
        <span className="font-medium">Valor:</span> {formatCurrency(data.value)}
      </p>
    </div>
  );
}

// ========================================
// FORMAT AXIS
// ========================================

function formatYAxisValue(value: number): string {
  if (value >= 10000) return `${(value / 1000).toFixed(0)}k`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toString();
}

// ========================================
// WATERFALL CHART COMPONENT
// ========================================

interface WaterfallChartProps {
  data: WaterfallDataPoint[];
}

export default function WaterfallChart({ data }: WaterfallChartProps) {
  if (data.length === 0) return null;

  // Find max value for chart scale
  const maxValue = Math.max(...data.map(d => Math.max(d.end, d.start))) * 1.1;

  return (
    <div className="h-[350px] sm:h-[400px] bg-gradient-to-b from-white to-neutral-50/50 rounded-xl p-4 border border-neutral-100">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 10, bottom: 30 }}
        >
          <defs>
            {/* Gradient for income bar */}
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.9} />
              <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0.7} />
            </linearGradient>
            
            {/* Gradient for expense bars */}
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.7} />
            </linearGradient>
          </defs>

          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#E5E7EB" 
            vertical={false}
            opacity={0.5}
          />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#6B7280" }}
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB" }}
            dy={10}
            angle={0}
            textAnchor="middle"
          />

          <YAxis
            tickFormatter={formatYAxisValue}
            tick={{ fontSize: 11, fill: "#6B7280" }}
            tickLine={false}
            axisLine={false}
            width={60}
            dx={-5}
            domain={[0, maxValue]}
          />

          <Tooltip 
            content={<WaterfallTooltip />}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />

          {/* Base bar (invisible, for positioning) */}
          <Bar 
            dataKey="start" 
            stackId="stack" 
            fill="transparent"
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />

          {/* Value bar (colored) */}
          <Bar 
            dataKey="value" 
            stackId="stack"
            radius={[8, 8, 0, 0]}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.fill}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t border-neutral-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-success)' }} />
          <span className="text-xs text-neutral-600">Rendimento/Excedente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#94A3B8]" />
          <span className="text-xs text-neutral-600">Gastos Fixos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-warning)' }} />
          <span className="text-xs text-neutral-600">Gastos Variáveis</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-error)' }} />
          <span className="text-xs text-neutral-600">Défice</span>
        </div>
      </div>
    </div>
  );
}
