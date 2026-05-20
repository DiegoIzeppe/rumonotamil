import { useState } from "react";
import toast from "react-hot-toast";
import type { EssayCorrectionOutput } from "@/lib/claude";

export type { EssayCorrectionOutput };

export interface CorrectionResult {
  feedback: EssayCorrectionOutput;
}

export function useEssayCorrection() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CorrectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const correct = async (content: string, theme?: string): Promise<CorrectionResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/correct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, theme }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data.error ?? "Erro ao corrigir redação";
        setError(msg);
        toast.error(msg);
        return null;
      }

      const correctionResult = data as CorrectionResult;
      setResult(correctionResult);
      toast.success("Redação corrigida com sucesso!");
      return correctionResult;
    } catch {
      const msg = "Erro de conexão. Tente novamente.";
      setError(msg);
      toast.error(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { correct, loading, result, error, reset };
}
