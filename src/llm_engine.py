# ==============================================================================
# LLM INTEGRATION: MuniciPAL Generation Engine (Google Gemini Version)
# By: Allison Cerna (Team 13 Lead)
# ==============================================================================

import os
import google.generativeai as genai

class MuniciPALEngine:
    def __init__(self, api_key=None):
        # passing the key in so we can swap between real/mock modes easy
        # keeps our app flexible for testing without burning api credits
        self.api_key = api_key
        if self.api_key:
            # setting up the connection to gemini
            genai.configure(api_key=self.api_key)
            
            self.model = genai.GenerativeModel('gemini-2.0-flash')
        else:
            self.model = None

    def generate_response(self, user_query, retrieved_chunks):
        # keeping mock mode active so we don't block dev just because of api quotas
        # helps us test the pipeline architecture right now
        if not self.model:
            return f"[MOCK MODE] logic test: successfully processed query '{user_query}' with {len(retrieved_chunks)} chunks"
        
        # here's the brain
        # joining our context chunks into one clean string where retrieval data meets the prompt
        context = "\n\n".join(retrieved_chunks)
        
        # hardcoding the system prompt to keep the model grounded
        # really want to make sure it doesn't hallucinate outside of our municipal docs
        system_instruction = (
            "You are a municipal policy assistant for Team 13 (MuniciPAL). "
            "Use ONLY the provided context to answer the user's question. "
            "If the answer is not found in the context, state: "
            "'I do not have enough information in the municipal records to answer this.'"
        )
        
        # keeping the api call straightforward
        # context plus question equals grounded answer
        prompt = f"{system_instruction}\n\nContext: {context}\n\nQuestion: {user_query}"
        
        # sending the request to gemini to get our answer
        response = self.model.generate_content(prompt)
        
        # grabbing the content back for the user
        return response.text
