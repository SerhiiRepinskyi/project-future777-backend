### Інструкція по користуванню Postmen для перевірки endpoint-у "/api/columns"

# Попередні умови
Користувач має бути зареєстрований і залогінений, його токен має бути прописаний в Постмені:
  Authorization: Bearer Token,
  Token (приклад):
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWE1YjdiYzBlMWFkODRlOWFhMWU1YiIsImlhdCI6MTY5MzA4MDQ0NCwiZXhwIjoxNjkzMTYzMjQ0fQ.KbGgFrIqGgMiu7tNuYSMh_K_WaRzhL5Sc9td7eeYmQg

***************************
# ДОДАНО 2023-0829

## отримати картку по id
Тип запиту:     GET
Маршрут:        /api/cards/:id
Реквест Body: -
Приклад відповіді:
{
    "_id": "64f55b01968260dc14563eaa",
    "title": "Card Title 3",
    "description": "It is a test card",
    "priority": 3,
    "deadline": "2023-09-27T00:00:00.000Z",
    "owner": "64f55844968260dc14563e82"
}

*************************

## видалити картку за Id
Тип запиту:     DELETE
Маршрут:        /api/cards/:id
Реквест Body: -
Приклад відповіді:
{
    "message": "Card id=64f55b36968260dc14563eaf is deleted and removed from owner's list"
}

## перемістити картку в іншу колонку
Тип запиту:     PATCH
Маршрут:        /api/cards/:id
Реквест Body:
{
    "newOwnerId": "64f5586c968260dc14563e8d"
}
Приклад відповіді:
{
    "message": "Card moved"
}

## оновити картку
Тип запиту:     PUT
Маршрут:        /api/cards/:id
Реквест Body:
{
    "title": "Card Title UPDATED",
    "description": "It is a test card",
    "priority": 3,
    "deadline": "2023-09-09"
}
Приклад відповіді:
{
    "_id": "64f55b01968260dc14563eaa",
    "title": "Card Title UPDATED",
    "description": "It is a test card",
    "priority": 3,
    "deadline": "2023-09-09T00:00:00.000Z",
    "owner": "64f55844968260dc14563e82",
    "createdAt": "2023-09-04T04:20:17.120Z",
    "updatedAt": "2023-09-04T04:35:23.390Z"
}

