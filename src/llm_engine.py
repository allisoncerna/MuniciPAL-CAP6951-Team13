# LLM INTEGRATION
# By: Allison Cerna
# ==============================================================================

class MuniciPALEngine:
    def __init__(self, api_key):
        # Initializing the OpenAI client
        self.client = openai.OpenAI(api_key=api_key)

    def generate_response(self, user_query, retrieved_chunks):
        
        # This is the "brain." I'm joining the context chunks here because the LLM 
        # needs a clean block of text to work with.
        context = "\n\n".join(retrieved_chunks)
        
        # Hardcoding this system prompt to stop the model from making things up. 
        # If it's not in our documents, it needs to be honest and say so.
        system_prompt = (
            "You are a municipal policy assistant for Team 13 (MuniciPAL). "
            "Use ONLY the provided context to answer the user's question. "
            "If the answer is not found in the context, state: "
            "'I do not have enough information in the municipal records to answer this.'"
        )
        
        # Calling the API. Keeping it simple—context + question = result.
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Context: {context}\n\nQuestion: {user_query}"}
            ]
        )
        return response.choices[0].message.content