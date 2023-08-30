### Інструкція по користуванню Postmen для перевірки endpoint-у "/api/columns"

# Попередні умови
Користувач має бути зареєстрований і залогінений, його токен має бути прописаний в Постмені:
  Authorization: Bearer Token,
  Token (приклад):
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWE1YjdiYzBlMWFkODRlOWFhMWU1YiIsImlhdCI6MTY5MzA4MDQ0NCwiZXhwIjoxNjkzMTYzMjQ0fQ.KbGgFrIqGgMiu7tNuYSMh_K_WaRzhL5Sc9td7eeYmQg

***************************
# ДОДАНО 2023-0829

## отримати всі картки для заданої колонки по id
Тип запиту:     GET
Маршрут:        /api/columns/:id/cards
Реквест Body: -
Приклад відповіді:
[
    {
        "_id": "64edea6211fbaa9c98a98781",
        "title": "TEST CARD 1",
        "description": "string",
        "priority": 0,
        "deadline": "2023-09-02T00:00:00.000Z",
        "owner": "64ede88e11fbaa9c98a9876c",
        "createdAt": "2023-08-29T12:53:54.595Z",
        "updatedAt": "2023-08-29T12:57:47.481Z"
    }
]

## отримати колонку по id
Тип запиту:     GET
Маршрут:        /api/columns/:id
Реквест Body: -
Приклад відповіді:
{
    "_id": "64ede88e11fbaa9c98a9876c",
    "title": "TEST COLUMN 1",
    "cards": [
        "64edea6211fbaa9c98a98781",
        "64edea7511fbaa9c98a98786"
    ]
}
*************************

## видалити колонку за Id
Тип запиту:     DELETE
Маршрут:        /api/columns/:id
Реквест Body: -
Приклад відповіді:
{
    "message": "Column deleted( FIXME: delete all its cards)"
}

## оновити колонку
Тип запиту:     PATCH
Маршрут:        /api/columns/:id
Реквест Body:
{
   "title":"Column Title 2 UPDATED"
}
Приклад відповіді:
{
    "_id": "64eaae0d024b62561d1b830d",
    "title": "Column Title 2 UPDATED",
    "owner": "64ea78f39f7e49d73cfeeb0e",
    "createdAt": "2023-08-27T01:59:41.492Z",
    "updatedAt": "2023-08-27T03:11:52.173Z",
    "cards": [
        "64eabd636f886828c6573a0f"
    ]
}

## додати картку до колонки
Тип запиту:     POST
Маршрут:        /api/columns/:id/cards
Реквест Body:
{
   "title":"Card Title 2 Ok",
   "description":"It is a test card",
   "priority": "1",
   "deadline": "2023-08-27"
}
Приклад відповіді:
{
    "title": "Card Title 2 Ok",
    "description": "It is a test card",
    "priority": 1,
    "deadline": "2023-08-27T00:00:00.000Z",
    "owner": "64eaae0d024b62561d1b830d",
    "_id": "64eabd636f886828c6573a0f",
    "createdAt": "2023-08-27T03:05:07.967Z",
    "updatedAt": "2023-08-27T03:05:07.967Z"
}
