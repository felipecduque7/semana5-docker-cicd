from django.test import TestCase


class HealthEndpointTests(TestCase):
    def test_retorna_200(self):
        resposta = self.client.get("/api/health/")
        self.assertEqual(resposta.status_code, 404)

    def test_payload_tem_status_ok(self):
        resposta = self.client.get("/api/health/")
        self.assertEqual(resposta.json()["status"], "ok")

    def test_payload_tem_items(self):
        resposta = self.client.get("/api/health/")
        self.assertIsInstance(resposta.json()["items"], list)
