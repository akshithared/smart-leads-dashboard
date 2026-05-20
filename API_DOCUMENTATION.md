# API Documentation

## Base URL

http://localhost:5000/api

---

# Authentication APIs

## Register User

POST /auth/register

### Request Body

```json
{
  "name": "Akshitha",
  "email": "akshu@gmail.com",
  "password": "123456",
  "role": "admin"
}
```

---

## Login User

POST /auth/login

### Request Body

```json
{
  "email": "akshu@gmail.com",
  "password": "123456"
}
```

---

# Leads APIs

## Create Lead

POST /leads

Authorization: Bearer Token

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "status": "Qualified",
  "source": "Instagram"
}
```

---

## Get Leads

GET /leads

### Query Parameters

- page
- search
- status
- source
- sort

Example:

/leads?page=1&search=rahul&status=Qualified&source=Instagram&sort=latest

---

## Get Single Lead

GET /leads/:id

---

## Update Lead

PUT /leads/:id

---

## Delete Lead

DELETE /leads/:id