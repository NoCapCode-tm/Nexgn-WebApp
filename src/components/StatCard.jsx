import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ label, value, trend, trendUp }) {
  return (
    <div className="stat-card">
      <p className="stat-card__label">{label}</p>
      <h2 className="stat-card__value">{value}</h2>
      <div className={`stat-card__trend ${trendUp ? "stat-card__trend--up" : "stat-card__trend--down"}`}>
        {trendUp ? (
          <TrendingUp size={13} strokeWidth={2} />
        ) : (
          <TrendingDown size={13} strokeWidth={2} />
        )}
        <span>{trend} this week</span>
      </div>
    </div>
  );
}