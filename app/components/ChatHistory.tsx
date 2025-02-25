import React from "react";
import { Card, CardBody } from "@heroui/react";
import { ChatMessage } from "@/types/chatMessage";

const formatAnswer = (text: string) => {
  return text.split("\n").map((str, index) => (
    <span key={index}>
      {str}
      <br />
    </span>
  ));
};

interface ChatHistoryProps {
  messages: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => (
  <div className="w-full max-w-2xl mb-4">
    {messages.map((msg, index) => {
      const isQuestion = msg.type === "question";
      return (
        <div
          key={index}
          className={`mb-8 flex ${isQuestion ? "justify-end" : "justify-start"}`}
        >
          <Card
            className={`rounded-lg shadow-lg`}
            classNames={{
              body: `${isQuestion ? "bg-default-50" : "bg-default-100"}`,
            }}
          >
            <CardBody>
              <p className="leading-8 text-sm">{formatAnswer(msg.text)}</p>
            </CardBody>
          </Card>
        </div>
      );
    })}
  </div>
);

export default ChatHistory;
