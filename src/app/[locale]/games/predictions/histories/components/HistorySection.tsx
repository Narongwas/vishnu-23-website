"use client";

import HistoryCard from "@/app/[locale]/games/predictions/histories/components/HistoryCard";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import type { PredictionHistoryItem } from "@/lib/types/prediction";
import { useEffect, useState } from "react";

const HistorySection: StyleableFC = ({ className }) => {
  const [histories, setHistories] = useState<PredictionHistoryItem[] | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/v1/prediction/history");
        if (!res.ok) {
          throw new Error("Failed to fetch history data");
        }
        const data = await res.json();
        console.log(data);
        setHistories(data.history);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={cn("space-y-3 p-4", className)}>
      {histories?.length ? (
        histories.map((history) => (
          <HistoryCard key={history.predictionId} history={history} />
        ))
      ) : (
        <p className="type-title-medium text-center text-white">
          No prediction history available.
        </p>
      )}
    </div>
  );
};

export default HistorySection;
