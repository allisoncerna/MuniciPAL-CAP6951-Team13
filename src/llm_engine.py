# ==============================================================================
# LLM INTEGRATION: MuniciPAL Generation Engine (Google Gemini Version)
# By: Allison Cerna (Team 13 Lead)
# ==============================================================================

import os
import google.generativeai as genai

class MuniciPALEngine:
    def __init__(self, api_key=None):
        # We're passing the key in so we can swap between real/mock modes easily.
        # This keeps our app flexible for testing without needing to burn API credits.
        self.api_key = api_key
        if self.api_key:
            # Setting up the connection to Gemini.
            genai.configure(api_key=self.api_key)
            # Using Gemini 1.5 Flash—it’s fast, free, and perfect for what we need.
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.model = None

    def generate_response(self, user_query, retrieved_chunks):
        # I'm keeping 'Mock Mode' active so we don't block development 
        # just because of API quotas. It helps us test the pipeline architecture now.
        if not self.model:
            return f"[MOCK MODE] Logic test: Successfully processed query '{user_query}' with {len(retrieved_chunks)} chunks."
        
        # Here's the "brain." I'm joining our context chunks into one clean string.
        # This is where the retrieval data meets the prompt.
        context = "\n\n".join(retrieved_chunks)
        
        # Hardcoding the system prompt to keep the model grounded. 
        # I want to make sure it doesn't hallucinate outside of our municipal docs.
        system_instruction = (
            "You are a municipal policy assistant for Team 13 (MuniciPAL). "
            "Use ONLY the provided context to answer the user's question. "
            "If the answer is not found in the context, state: "
            "'I do not have enough information in the municipal records to answer this.'"
        )
        
        # Keeping the API call straightforward. Context + Question = Grounded Answer.
        prompt = f"{system_instruction}\n\nContext: {context}\n\nQuestion: {user_query}"
        
        # Sending the request to Gemini to get our answer.
        response = self.model.generate_content(prompt)
        
        # Extracting the content back to the user.
        return response.text