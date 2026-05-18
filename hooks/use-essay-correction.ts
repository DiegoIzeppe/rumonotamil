import { useState } from "react";
import toast from "react-hot-toast";

interface CorrectionResult {
  submissionId: string;
  feedback: {
    score: number;
    competency1: { score: number; feedback: string };
    competency2: { score: number; feedback: string };
    competency3: { score: number; feedback: string };
    competency4: { score: number; feedback: string };
    competency5: { score: number; feedback: string };
    generalFeedback: string;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    paragraphNotes: Array<{ paragraph: number; note: string; type: string }>;
  };
}

export function useEssayCorrection() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CorrectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const correct = async (content: string, theme?: string) => {
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
        setError(data.error ?? "Erro ao corrigir redação");
        toast.error(data.error ?? "Erro ao corrigir redação");
        return null;
      }

      setResult(data);
      toast.success("Redação corrigida com sucesso!");
      return data as CorrectionResult;
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
