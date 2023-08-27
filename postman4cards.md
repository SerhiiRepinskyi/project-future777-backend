### Інструкція по користуванню Postmen для перевірки endpoint-у "/api/columns"

# Попередні умови
Користувач має бути зареєстрований і залогінений, його токен має бути прописаний в Постмені:
  Authorization: Bearer Token,
  Token (приклад):
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWE1YjdiYzBlMWFkODRlOWFhMWU1YiIsImlhdCI6MTY5MzA4MDQ0NCwiZXhwIjoxNjkzMTYzMjQ0fQ.KbGgFrIqGgMiu7tNuYSMh_K_WaRzhL5Sc9td7eeYmQg


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


