### Інструкція по користуванню Postmen для перевірки endpoint-у "/api/boards"

# Попередні умови
Користувач має бути зареєстрований і залогінений, його токен має бути прописаний в Постмені:
  Authorization: Bearer Token,
  Token (приклад):
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWE1YjdiYzBlMWFkODRlOWFhMWU1YiIsImlhdCI6MTY5MzA4MDQ0NCwiZXhwIjoxNjkzMTYzMjQ0fQ.KbGgFrIqGgMiu7tNuYSMh_K_WaRzhL5Sc9td7eeYmQg

***************************
# ДОДАНО 2023-09-02 - отримання по id дошки її вмісту(масив колонок з вкладеними масивами карток), з можливістю фільтрувати картки по пріорітету

Тип запиту:     GET
Маршрут:        /api/boards/:id/content
Приклад маршруту з фільтрацією: api/boards/64f277b6144dd16a62e5ae74/content?priority=3
Реквест Body: -
Приклад відповіді:
{
    "_id": "64f277b6144dd16a62e5ae74",
    "content": [
        {
            "_id": "64f27866144dd16a62e5ae78",
            "title": "Column Title 1",
            "cards": [
                {
                    "_id": "64f27956144dd16a62e5ae9f",
                    "title": "Card Title 3",
                    "description": "It is a test card",
                    "priority": 3,
                    "deadline": "2023-09-27T00:00:00.000Z"
                },
                {
                    "_id": "64f27966144dd16a62e5aea4",
                    "title": "Card Title 31",
                    "description": "It is a test card",
                    "priority": 3,
                    "deadline": "2023-09-27T00:00:00.000Z"
                }
            ]
        },
        {
            "_id": "64f27870144dd16a62e5ae7f",
            "title": "Column Title 2",
            "cards": []
        },
        {
            "_id": "64f27876144dd16a62e5ae87",
            "title": "Column Title 3",
            "cards": []
        }
    ]
}


***************************
# ДОДАНО 2023-0829 - додаткові поля (iconId і backgroundURL) типу string для створення і оновлення дошки

## створити дошку
Тип запиту:     POST
Маршрут:        /api/boards
Реквест Body:
{
  "title":"My board title ",
  "iconId":"test-icon-id",
  "backgroundURL":"test background URL"
}
Приклад відповіді:
{
    "title": "My board title ",
    "icon": 0,
    "iconId": "test-icon-id",
    "background": 0,
    "backgroundURL": "test background URL",
    "owner": "64eeb060ed79201d44f957af",
    "_id": "64eec17a2f3361d862fd9627",
    "columns": [],
    "createdAt": "2023-08-30T04:11:38.117Z",
    "updatedAt": "2023-08-30T04:11:38.117Z"
}

## оновити дошку
Тип запиту:     PATCH
Маршрут:        /api/boards/:id
Реквест Body:
{
   "iconId":"UPDATED test-icon-id", "backgroundURL":"UPDATED test background URL"
}
Приклад відповіді:
{
    "_id": "64eec17a2f3361d862fd9627",
    "title": "My board title ",
    "icon": 0,
    "iconId": "UPDATED test-icon-id",
    "background": 0,
    "backgroundURL": "UPDATED test background URL",
    "owner": "64eeb060ed79201d44f957af",
    "columns": [],
    "createdAt": "2023-08-30T04:11:38.117Z",
    "updatedAt": "2023-08-30T04:13:15.363Z"
}

***************************


## створити дошку
Тип запиту:     POST
Маршрут:        /api/boards
Реквест Body:
{
  "title":"My board title",  "background":"15", "iconId": "hexagone"
}
Приклад відповіді:
{
    "title": "My board title",
    "icon": 0,
    "iconId": "hexagone",
    "background": 15,
    "owner": "64f0134bdb49898c7ea25dcc",
    "_id": "64f0ab840d512cdb2e218843",
    "columns": [],
    "createdAt": "2023-08-31T15:02:28.529Z",
    "updatedAt": "2023-08-31T15:02:28.529Z"
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
    "owner": "64f0ab840d512cdb2e218843",
    "cards": [],
    "_id": "64f0ac0b0d512cdb2e218847",
    "createdAt": "2023-08-31T15:04:43.996Z",
    "updatedAt": "2023-08-31T15:04:43.996Z"
}



"Cast to ObjectId failed for value \"{\n  cardId: new ObjectId(\"64eabb7d7087d6304249ddcd\"),\n  cardTitle: 'Card Title 2 Ok'\n}\" (type Object) at path \"cards\" because of \"BSONError\""
}
