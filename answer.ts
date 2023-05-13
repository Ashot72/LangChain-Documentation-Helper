
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import * as store from "store"

const client = new PineconeClient()

client.init({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!
})

export const getAnswer = async (req, res) => {
    const data = req.body;
    
    const {  question, source } = data   

    const pineconeIndex = client.Index(process.env.PINECONE_INDEX!)

    const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings(),
        { pineconeIndex }
    )

    const model = new OpenAI({temperature: 0})
    const chain = ConversationalRetrievalQAChain.fromLLM(
        model, 
        vectorStore.asRetriever(),
        { returnSourceDocuments: JSON.parse(source)})

    const chat = store.get('chat')
    const response = await chain.call({ question, chat_history: chat ? chat.history : []})
  
    store.set('chat', { history: question + response.text })
 
    res.json({ data: response })
}