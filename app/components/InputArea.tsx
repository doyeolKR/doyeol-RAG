import React from "react";
import { Button, Textarea } from "@heroui/react";
import TooltipArea from "./TooltipArea";

const InputArea = ({
  question,
  setQuestion,
  handleAsk,
  loading,
  handleKeyDown,
}: {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  handleAsk: () => void;
  loading: boolean;
  handleKeyDown: (event: React.KeyboardEvent<any>) => void;
}) => (
  <div className="w-full max-w-2xl sticky bottom-0">
    <div className="relative">
      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="개발자 유도열에 대해 질문해 보세요."
        fullWidth
        className="mb-2"
        variant="faded"
        classNames={{
          inputWrapper: ["bg-default-200"],
        }}
      />
      <TooltipArea />
    </div>

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
);

export default InputArea;
