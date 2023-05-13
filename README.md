# LangChain Documentation Helper

 [LangChain](https://js.langchain.com/docs/) is de facto go to framework for building LLM (Large Language Model) based applications. It gains massive popularity lately for developers wanting to get into AI (Artificial Intelligence) and to build AI based applications. 

I built very basic LangChain Node.js Documentation Helper app using LLM (Large Language Model). We will be able to ask some questions and get answers. You will see how we split our various files into chunks and put them into a vector database using embeddings. We use [Pinecone](https://www.pinecone.io/) vector database. Then we create a chain which takes the query (prompt), embeds it as a vector, then takes couple of vectors which are closest to the query vector semantically and returns it. These relevant chunks can contain the answer or have a high probability of containing the answer and only those chunks will be sent to the LLM. In that way we only make a couple of API calls or even one and we can save a lot of money and get response a lot faster and not doing any redundant work. So, we pass the prompt plus the relevant chunks (context) to the LLM to get the answer. 

We can also view source documents that we were used to retrieve the answer. This can be useful if we want to allow the user to see the sources used to generate the answer.

We also want our chat to have the ability to remember and reference things that we asked in the past when talking to ChatGPT.

To get started.
```
       Clone the repository

       git clone https://github.com/Ashot72/LangChain-Documentation-Helper
       cd LangChain-Documentation-Helper

       Add your keys to .env file
       
       # installs dependencies
       npm install

       # to embed
         npm run embed
         
       # to run locally
        npm start
      
```

Go to [LangChain Documentation Helper Video](https://youtu.be/c9ujzXuMx9Y) page

Go to [LangChain Documentation Helper description](https://ashot72.github.io/LangChain-Documentation-Helper/doc.html) page

