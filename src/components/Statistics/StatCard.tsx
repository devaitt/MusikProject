import React from "react";

interface Props {
  label: string;
  icon: React.ReactNode;
  value: number;
}

export default function StatCard({ label, icon, value }: Props) {
  return (
    <>
      <li className="statistics__card ">
        <div className="stat-card__container">
          <div className="stat-card__logo">
            <span>{icon}</span>
          </div>
          <p className="stat-card__stat">{value}</p>
          <p className="stat-card__text">{label}</p>
        </div>
      </li>
    </>
  );
}
