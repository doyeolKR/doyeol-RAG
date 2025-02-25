"use client";

import { useState } from "react";
import ChatHistory from "./components/ChatHistory";
import InputArea from "./components/InputArea";
import { ChatMessage } from "../types/chatMessage";

export default function Home() {
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // ChatMessage 타입 배열로 지정

  const handleAsk = async () => {
    if (!question.trim()) return alert("질문을 입력해주세요.");

    setQuestion("");

    // 질문을 chatHistory에 추가
    const newQuestion: ChatMessage = { type: "question", text: question };
    setChatHistory((prevHistory) => [...prevHistory, newQuestion]);

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
      const newAnswer = message.result || "답변을 찾을 수 없습니다.";

      const newAnswerMessage: ChatMessage = { type: "answer", text: newAnswer };
      setChatHistory((prevHistory) => [...prevHistory, newAnswerMessage]);
    } catch (error) {
      console.error("에러 발생:", error);
      const errorAnswer: ChatMessage = {
        type: "answer",
        text: "오류가 발생했습니다. 다시 시도해주세요.",
      };
      setChatHistory((prevHistory) => [...prevHistory, errorAnswer]);
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

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4">
      <ChatHistory messages={chatHistory} />
      <InputArea
        question={question}
        setQuestion={setQuestion}
        handleAsk={handleAsk}
        loading={loading}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
}
