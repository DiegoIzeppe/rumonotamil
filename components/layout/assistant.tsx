"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, RotateCcw, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "Como melhorar minha C4?",
  "Como usar Boaventura de Sousa Santos?",
  "O que é uma boa proposta de intervenção?",
  "Como evitar fuga ao tema?",
];

const MOCK_RESPONSES: Record<string, string> = {
  "Como melhorar minha C4?": "Para melhorar a C4, foque em **variar os conectivos**. Evite repetir 'além disso' — substitua por: *ademais*, *outrossim*, *nesse contexto*, *por conseguinte*, *somado a isso*. Também cuide das retomadas anafóricas: use pronomes e sinônimos para evitar repetição lexical. Cada parágrafo deve começar onde o anterior terminou.",
  "Como usar Boaventura de Sousa Santos?": "Use Santos para temas sobre **minorias, povos indígenas, desigualdade epistêmica ou grupos subalternizados**. O conceito de *epistemicídio* (silenciamento de saberes não-ocidentais) funciona bem em contextos de exclusão cultural. Exemplo: *'Boaventura de Sousa Santos alerta que grupos historicamente marginalizados sofrem violência epistêmica — silenciamento que perpetua sua invisibilidade institucional.'*",
  "O que é uma boa proposta de intervenção?": "A proposta perfeita tem **5 elementos**: (1) **Agente** específico (Ministério da Educação, não 'o governo'); (2) **Ação** concreta (implementar, criar, regulamentar); (3) **Modo/Meio** (como será feito); (4) **Finalidade** (objetivo final); (5) **Detalhamento** (especificidade que mostra viabilidade). Ela deve atacar o problema que você identificou no texto e respeitar os direitos humanos.",
  "Como evitar fuga ao tema?": "Leia o tema 3 vezes antes de começar. Identifique: a **palavra-chave central**, o **recorte** proposto e o **tipo textual** exigido (dissertativo-argumentativo). Sua tese deve conter a palavra-chave. No final de cada parágrafo, verifique se o argumento ainda se conecta ao tema. Erro comum: tratar o tema de forma genérica quando ele pede um recorte específico.",
};

async function getAIResponse(messages: Message[]): Promise<string> {
  const lastUserMsg = messages[messages.length - 1]?.content ?? "";
  if (MOCK_RESPONSES[lastUserMsg]) return MOCK_RESPONSES[lastUserMsg];

  try {
    const res = await fetch("/api/ai/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.response;
  } catch {
    return "Não consegui processar sua pergunta agora. Tente novamente ou reformule a pergunta.";
  }
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex gap-2.5", isUser && "flex-row-reverse")}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-3.5 h-3.5 text-blue-400" />
        </div>
      )}
      <div className={cn(
        "max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
        isUser
          ? "bg-blue-500 text-white rounded-tr-sm"
          : "glass border border-white/10 text-white/80 rounded-tl-sm"
      )}>
        <span dangerouslySetInnerHTML={{
          __html: msg.content
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic text-blue-200">$1</em>')
            .replace(/\n/g, "<br />")
        }} />
      </div>
    </div>
  );
}

export function FloatingAssistant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou seu assistente de redação ENEM. Pode me perguntar sobre competências, repertórios, estrutura do texto ou qualquer dúvida sobre redação.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Todos os hooks acima — return condicional só aqui
  if (pathname === "/simulado") return null;

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    const newMsgs: Message[] = [...messages, { role: "user", content }];
    setMessages(newMsgs);
    setLoading(true);
    const response = await getAIResponse(newMsgs);
    setMessages([...newMsgs, { role: "assistant", content: response }]);
    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white shadow-glow flex items-center justify-center transition-all hover:scale-110"
          >
            <MessageCircle className="w-6 h-6" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full border-2 border-blue-400/40 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-h-[540px] flex flex-col rounded-2xl overflow-hidden shadow-[0_8px_48px_rgba(0,0,0,0.5)]"
            style={{ background: "rgba(10, 15, 28, 0.97)", border: "1px solid rgba(59,130,246,0.2)", backdropFilter: "blur(20px)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Assistente ENEM</p>
                <p className="text-[11px] text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Online
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages([{ role: "assistant", content: "Histórico limpo. Como posso ajudar?" }])}
                  className="p-1.5 rounded-lg hover:bg-white/6 text-white/30 hover:text-white/60 transition-colors"
                  title="Limpar conversa"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/6 text-white/30 hover:text-white/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
              {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}

              {loading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="glass border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-[11px] text-blue-400/80 border border-blue-500/20 rounded-full px-2.5 py-1 hover:bg-blue-500/10 hover:text-blue-300 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 pb-4 pt-2 flex-shrink-0 border-t border-white/6">
              <div className="flex gap-2 items-end">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Pergunte sobre redação ENEM..."
                  rows={1}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none resize-none focus:border-blue-500/35 transition-colors leading-relaxed"
                  style={{ maxHeight: "100px" }}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                    input.trim() && !loading
                      ? "bg-blue-500 hover:bg-blue-400 text-white"
                      : "bg-white/5 text-white/20 cursor-not-allowed"
                  )}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-white/20 mt-1.5 text-center">Enter para enviar · Shift+Enter para nova linha</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
