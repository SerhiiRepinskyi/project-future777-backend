### Інструкція по користуванню Postmen для перевірки endpoint-у "/api/boards"

# Попередні умови
Користувач має бути зареєстрований і залогінений, його токен має бути прописаний в Постмені:
  Authorization: Bearer Token,
  Token (приклад):
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWE1YjdiYzBlMWFkODRlOWFhMWU1YiIsImlhdCI6MTY5MzA4MDQ0NCwiZXhwIjoxNjkzMTYzMjQ0fQ.KbGgFrIqGgMiu7tNuYSMh_K_WaRzhL5Sc9td7eeYmQg

## отримати всі дошки залогіненого юзера
Тип запиту:     GET
Маршрут:        /api/boards
Реквест Body: -
Приклад відповіді:
[
    {
        "_id": "64ea61aa3ff64045765b1c67",
        "title": "My board title 3",
        "icon": 3,
        "background": 13,
        "columns": []
    },
    {
        "_id": "64ea62d122baaeef7d671480",
        "title": "My board title (updated)",
        "icon": 7,
        "background": 0,
        "columns": []
    }
]

## отримати дошку за Id
Тип запиту:   GET
Маршрут:      /api/boards/:id
              (наприклад, /api/boards/64ea61aa3ff64045765b1c67)
Реквест Body: -
Приклад відповіді:
{
    "_id": "64ea61aa3ff64045765b1c67",
    "title": "My board title 3",
    "icon": 3,
    "background": 13,
    "columns": [
        {
            "columnId": "64ea8f2e01bda25f410bf8dc",
            "columnTitle": "Column Title 2",
            "_id": "64ea8f2f01bda25f410bf8df"
        }
    ]
}

## видалити дошку за Id
Тип запиту:     DELETE
Маршрут:        /api/boards/:id
Реквест Body: -
Приклад відповіді:
{
    "message": "Board deleted( FIXME: delete all its columns and cards)"
}

## створити дошку
Тип запиту:     POST
Маршрут:        /api/boards
Реквест Body:
{
  "title":"My board title", "icon":"1", "background":"15"
}
Приклад відповіді:
{
    "title": "My board title",
    "icon": 1,
    "background": 15,
    "owner": "64ea5b7bc0e1ad84e9aa1e5b",
    "_id": "64ea78f39f7e49d73cfeeb0e",
    "columns": [],
    "createdAt": "2023-08-26T22:13:07.931Z",
    "updatedAt": "2023-08-26T22:13:07.931Z"
}

## оновити дошку
Тип запиту:     PATCH
Маршрут:        /api/boards/:id
Реквест Body:
{
   "title":"My board UPDATED", "icon":"7"
}
Приклад відповіді:
{
    "_id": "64ea78f39f7e49d73cfeeb0e",
    "title": "My board UPDATED",
    "icon": 7,
    "background": 15,
    "owner": "64ea5b7bc0e1ad84e9aa1e5b",
    "columns": [],
    "createdAt": "2023-08-26T22:13:07.931Z",
    "updatedAt": "2023-08-26T22:21:20.379Z"
}

## додати колонку дошки
Тип запиту:     POST
Маршрут:        /api/boards/:id/columns
Реквест Body:
{
   "title":"Column Title 2"
}
Приклад відповіді:
{
    "title": "Column Title 2",
    "owner": "64ea61aa3ff64045765b1c67",
    "cards": [],
    "_id": "64ea8f2e01bda25f410bf8dc",
    "createdAt": "2023-08-26T23:47:58.748Z",
    "updatedAt": "2023-08-26T23:47:58.748Z"
}



"Cast to ObjectId failed for value \"{\n  cardId: new ObjectId(\"64eabb7d7087d6304249ddcd\"),\n  cardTitle: 'Card Title 2 Ok'\n}\" (type Object) at path \"cards\" because of \"BSONError\""
}
