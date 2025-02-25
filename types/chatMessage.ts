export interface ChatMessage {
  type: "question" | "answer";
  text: string;
}
