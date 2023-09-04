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
    "title": "Olga's second board title",
    "iconId": "puzzle",
    "background": 0,
    "content": [
        {
            "_id": "64f27866144dd16a62e5ae78",
            "title": "Column Title 1",
            "cards": [
                {
                    "_id": "64f27939144dd16a62e5ae94",
                    "title": "Card Title 1",
                    "description": "It is a test card",
                    "priority": 1,
                    "deadline": "2023-09-27T00:00:00.000Z"
                },
                {
                    "_id": "64f27947144dd16a62e5ae9a",
                    "title": "Card Title 2",
                    "description": "It is a test card",
                    "priority": 2,
                    "deadline": "2023-09-27T00:00:00.000Z"
                },
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

## створити дошку
Тип запиту:     POST
Маршрут:        /api/boards
Реквест Body:
{
  "title":"Olga board title 1",
  "iconId":"test-icon-id",
  "background":"0"
}
Приклад відповіді:
{
    "title": "Olga board title 1",
    "iconId": "test-icon-id",
    "background": 0,
    "owner": "64f13004cfaa9278e2244c98",
    "content": [],
    "_id": "64f555d1968260dc14563e74",
    "createdAt": "2023-09-04T03:58:09.773Z",
    "updatedAt": "2023-09-04T03:58:09.773Z"
}

## оновити дошку
Тип запиту:     PATCH
Маршрут:        /api/boards/:id
Реквест Body:
{
  "title":"Olga board title PATCHED",
  "background":"15"
}
Приклад відповіді:
{
    "_id": "64f555d1968260dc14563e74",
    "title": "Olga board title PATCHED",
    "iconId": "test-icon-id",
    "background": 15,
    "owner": "64f13004cfaa9278e2244c98",
    "content": [],
    "createdAt": "2023-09-04T03:58:09.773Z",
    "updatedAt": "2023-09-04T04:01:36.306Z"
}

***************************

## отримати всі дошки залогіненого юзера
Тип запиту:     GET
Маршрут:        /api/boards
Реквест Body: -
Приклад відповіді:
[
    {
        "_id": "64f555d1968260dc14563e74",
        "title": "Olga board title PATCHED",
        "iconId": "test-icon-id",
        "background": 15
    }
]

## отримати дошку за Id
Тип запиту:   GET
Маршрут:      /api/boards/:id
              (наприклад, /api/boards/:id)
NB! може включати fields параметр, наприклад,
      /api/boards/:id?fields=iconId title
Тоді повертає вказані поля, по дефолту  поля "title iconId background"
Реквест Body: -
Приклад відповіді:
{
    "_id": "64f555d1968260dc14563e74",
    "title": "Olga board title PATCHED",
    "iconId": "test-icon-id",
    "background": 15
}
Приклад відповіді для /api/boards/64f555d1968260dc14563e74?fields=iconId title
{
    "_id": "64f555d1968260dc14563e74",
    "title": "Olga board title PATCHED",
    "iconId": "test-icon-id"
}

## видалити дошку за Id FIXME:
Тип запиту:     DELETE
Маршрут:        /api/boards/:id
Реквест Body: -
Приклад відповіді:
{
    "message": "Board deleted(delete all its columns and cards)"
}

## додати колонку дошки
Тип запиту:     POST
Маршрут:        /api/boards/:id/columns
Реквест Body:
{
   "title":"Column Title 1"
}
Приклад відповіді:
{
    "title": "Column Title 1",
    "owner": "64f555d1968260dc14563e74",
    "cards": [],
    "_id": "64f55844968260dc14563e82",
    "createdAt": "2023-09-04T04:08:36.911Z",
    "updatedAt": "2023-09-04T04:08:36.911Z"
}
