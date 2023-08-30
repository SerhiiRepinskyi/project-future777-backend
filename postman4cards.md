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
    "title": "TEST CARD 2",
    "description": "it is a description of test card 2",
    "priority": 1,
    "deadline": "2023-09-02T00:00:00.000Z",
    "owner": "64eacc9f4040dd4d17e3e96f",
    "_id": "64eebfb62f3361d862fd9623",
    "createdAt": "2023-08-30T04:04:06.925Z",
    "updatedAt": "2023-08-30T04:04:06.925Z"
}
*************************

## видалити колонку за Id
Тип запиту:     DELETE
Маршрут:        /api/cards/:id
Реквест Body: -
Приклад відповіді:
{
    "message": "Column deleted (FIXME: delete from owner's list)"
}

## оновити картку
Тип запиту:     PUT
Маршрут:        /api/cards/:id
Реквест Body:
{

}
Приклад відповіді:
{

}


