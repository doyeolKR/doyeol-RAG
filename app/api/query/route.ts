import type { NextApiRequest, NextApiResponse } from "next";

import dotenv from "dotenv";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { NextResponse } from "next/server";

dotenv.config({ path: ".env.local" });

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
      batchSize: 512,
      model: "text-embedding-3-small",
    });

    const pinecone = new PineconeClient();
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX as string);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: pineconeIndex,
    });

    const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 });

    const prompt = ChatPromptTemplate.fromTemplate(
      `Answer the user's question: {input} based on the following context {context}`
    );

    const combineDocsChain = await createStuffDocumentsChain({
      llm,
      prompt,
    });
    const retriever = vectorStore.asRetriever();

    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever,
    });
    const response = await retrievalChain.invoke({ input: question });

    return NextResponse.json({ result: response.answer }, { status: 200 });
  } catch (error: any) {
    console.error("Error in query API:", error);

    return NextResponse.json(
      { error: "알 수 없는 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
