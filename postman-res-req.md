<!-- USER -->

1. Регистрация пользователя - POST
http://localhost:8000/api/auth/register
    body:
        {
        "name": "yyy",
        "password": "111",
        "email": "yyy@nnn.nnn"
        }
    ответ:
        {
        "email": "yyy@nnn.nnn",
        "subscription": "starter"
        }

2. Логин - POST
http://localhost:8000/api/auth/login
    body:
        {
        "password": "111",
        "email": "yyy@nnn.nnn"
        }
    ответ - token
        {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDEzNTgwMzU1NTk0ZWQyYjFmNjNhYSIsImlhdCI6MTY5MTQzMjQzNywiZXhwIjoxNjkxNTE1MjM3fQ.l7fW5w2WjtO5JyFTez-uDHTAtnOlTmHVmfwLD7zx0CA"
        }

3. Получить текущего пользователя - GET
http://localhost:8000/api/users/current
    body - нет
    ответ:
        {
        "email": "yyy@nnn.nnn"
        }

4. Разлогиниться- POST
http://localhost:8000/api/auth/logout
    body:
        {
        "email": "yyy@nnn.nnn"
        }
    ответ:
        {
        "message": "Signout success"
        }