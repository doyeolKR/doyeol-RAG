"use client";

import { Button, Textarea, Card, CardBody } from "@heroui/react";
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return alert("질문을 입력해주세요.");
    setLoading(true);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error("서버 응답이 올바르지 않습니다.");
      }

      const message = await res.json();

      setAnswer(message.result || "답변을 찾을 수 없습니다.");
    } catch (error) {
      console.error("에러 발생:", error);
      setAnswer("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<any>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleAsk();
    }
  };

  const formatAnswer = (text: string) => {
    return text.split("\n").map((str, index) => (
      <span key={index}>
        {str}
        <br />
      </span>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4">
      <div className="w-full max-w-2xl mb-4">
        {answer && (
          <Card className="rounded-lg shadow-lg">
            <CardBody>
              <p className="text-base">답변:</p>
              <p className="mt-2 leading-8 text-sm">{formatAnswer(answer)}</p>
            </CardBody>
          </Card>
        )}
      </div>
      <div className="w-full max-w-2xl sticky bottom-0">
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="개발자 유도열에 대해 질문해 보세요."
          fullWidth
          className="mb-2 text-black rounded-xl"
        />
        <Button
          onPress={handleAsk}
          disabled={loading}
          color="primary"
          className="w-full"
          isLoading={loading}
        >
          질문하기
        </Button>
      </div>
    </div>
  );
}
