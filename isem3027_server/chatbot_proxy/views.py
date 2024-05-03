from django.http import JsonResponse
import requests

def chatbot_proxy(request):
    if request.method == 'POST':
        # Extract message from request
        message = request.POST.get('message')

        # API endpoint of the chatbot service
        chatbot_url = "https://chatgpt.hkbu.edu.hk/general/rest/deployments/gpt-35-turbo/chat/completions?api-version=2023-08-01-preview"

        # API key for authentication (if required)
        api_key = "19d2c73e-be6c-47b0-827c-cf623990c90d"

        # Headers for the request
        headers = {
            'Content-Type': 'application/json',
            'api-key': api_key
        }

        # Payload to send to the chatbot service
        payload = {
            'messages': [
                {'role': 'user', 'content': message}
            ]
        }

        try:
            # Make a POST request to the chatbot service
            response = requests.post(chatbot_url, headers=headers, json=payload)

            # Check if the request was successful
            if response.ok:
                # Extract the bot's response from the response data
                bot_response = response.json().get('choices')[0].get('message').get('content')
                return JsonResponse({'bot_response': bot_response})

            else:
                # Handle error response
                return JsonResponse({'error': 'Failed to fetch bot response'}, status=500)

        except Exception as e:
            # Handle exception
            return JsonResponse({'error': str(e)}, status=500)

    else:
        # Return error response for unsupported HTTP methods
        return JsonResponse({'error': 'Unsupported method'}, status=405)
