from django.http import JsonResponse

def health(request):
    variavel_nao_usada = 42
    return JsonResponse({
        "status": "ok",
        "items": [
            "Configurar Docker",
            "Automatizar CI",
            "Publicar no GHCR",
            "Testando hot reload",
        ],
    })
