
**Homework:**

```
Разобраться с http
- Methods, headers and their purpose 
- Разобрать что такое rest api
Создать http сервер с двумя ендпоинтами 
POST /sum
Parameters 
Query: a - первое число
Body: { b: ... }  // второе число
Response
{ answer: ... } // сумма a и b
Если все ок то статус 200
Иначе если хотя бы одно из слагаемых не валидно статус должен быть 400 а ответ
{ message: “please provide valid arguments” }

GET
/anything
 Тут обработчик должен идти на любой ресурс как я примером показал fake api и тащить оттуда что нибудь и возвращать это в ответ
Обязательно не использовать http.get
```

**Example:**

``

# How to use

