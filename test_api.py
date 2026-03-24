import requests

BASE_URL = "http://localhost:8000"

print("=== Тест 1: Создание задачи ===")
response = requests.post(f"{BASE_URL}/tasks", json={"title": "Gym", "priority": "low"})
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")
print()

print("=== Тест 2: Создание второй задачи ===")
response = requests.post(f"{BASE_URL}/tasks", json={"title": "Buy a laptop", "priority": "high"})
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")
print()

print("=== Тест 3: Получение списка всех задач ===")
response = requests.get(f"{BASE_URL}/tasks")
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")
print()

print("=== Тест 4: Отметка задачи как выполненной (id=1) ===")
response = requests.post(f"{BASE_URL}/tasks/1/complete")
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")
print()

print("=== Тест 5: Проверка обновления списка ===")
response = requests.get(f"{BASE_URL}/tasks")
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")
print()

print("=== Тест 6: Задача не найдена (id=999) ===")
try:
    response = requests.post(f"{BASE_URL}/tasks/999/complete")
    print(f"Status: {response.status_code}")
except Exception as e:
    print(f"Error: {e}")
print()

print("=== Тест 7: Проверка сохранения в файл ===")
with open("tasks.txt", "r", encoding="utf-8") as f:
    print(f"Содержимое tasks.txt:\n{f.read()}")
