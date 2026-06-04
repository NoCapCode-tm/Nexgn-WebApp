import { ArrowUp, ArrowDown } from "lucide-react";

export default function MemberStatCard({ label, value, trend, trendUp, trendColor }) {
  const trendClass = trendColor
    ? `stat-card__trend--${trendColor}`
    : trendUp
    ? "stat-card__trend--up"
    : "stat-card__trend--down";

  return (
    <div className="stat-card">
      <p className="stat-card__label">{label}</p>
      <h2 className="stat-card__value">{value}</h2>
      <div className={`stat-card__trend ${trendClass}`}>
        {trendUp ? (
          <ArrowUp size={13} strokeWidth={2} />
        ) : (
          <ArrowDown size={13} strokeWidth={2} />
        )}
        <span>{trend} this week</span>
      </div>
    </div>
  );
}
