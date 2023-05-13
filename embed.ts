import * as path from 'path';
import { UnstructuredDirectoryLoader } from "langchain/document_loaders/fs/unstructured";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const run = async() => {

if (
    !process.env.PINECONE_API_KEY ||
    !process.env.PINECONE_ENVIRONMENT ||
    !process.env.PINECONE_INDEX
  ) {
    throw new Error(
      "PINECONE_ENVIRONMENT and PINECONE_API_KEY and PINECONE_INDEX must be set"
    );
  }

  try{
    const client = new PineconeClient()

    await client.init({
        apiKey: process.env.PINECONE_API_KEY,
        environment: process.env.PINECONE_ENVIRONMENT
    })

    const index = client.Index(process.env.PINECONE_INDEX);

    const loader = new UnstructuredDirectoryLoader(path.join(__dirname+'/data'), {})

    const documents = await loader.loadAndSplit(
        new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 100,
        })
    )

    console.log("Documents length", documents.length)
  
    await PineconeStore.fromDocuments(
        documents,
        new OpenAIEmbeddings(),
        { pineconeIndex: index }
      );
    }catch(error) {
        console.log({error})
    }

  console.log("Added to Pinecore vectorestore vectors")
}

run()