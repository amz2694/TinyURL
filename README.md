# TinyURL
### Table of Contents
- [General info](#general-info)
- [Technologies](#technologies)
- [How To Use](#how-to-use)
  - [front-end](#front-End-project-setup)
  - [back-end](#Back-End-project-setup)
  - [database](#database-setup)
- [API Reference](#api-reference)
- [License](#license)

## General Info

TinyURL is a simple MEVN stack URL shortener.

## Technologies

- HTML/CSS3
- nodeJs
- express
- vue 3
- vue router
- mongoDB

## How To Use

### Installation
You can install TinyURL locally using npm.

#### Front-End project setup

Install dependencies using:

```html
cd front
npm install
```

Compile and hot-reload for development using:

```html
npm run serve
```

Compile and minifile for production by running:

```html
npm run build
```

#### Back-End project setup

Install dependencies using:

```html
cd back
npm install
```

Compiles for development using:

```html
npm run dev
```

or start the server by using the following command:

```html
npm start
``` 

#### database setup
replace your database url in `back/.env` file

## API Reference

You can get the original URL using:
```http
GET   /short
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `URL` | `string` | **Required**. short url |

200 status code return `{realURL : string}`

---

shorten the URL:
```http
POST  /short
```
Login is required to request this API. The request should be a JSON in the form of `{URL : string}`. Make sure to put `Bearer accessToken` in `headed.Authorization`.

201 status code return `{shortURL : string}`

---

Sign up :
```http
POST  /register
```
The request should be a JSON in the form of
```javascript
{
  user  : string,
  email : string,
  pwd   : string
}
```
201 status code return `{ "success": 'new user ${user} created!' }`

other status code : 
| Status Code | Description |
| :--- | :--- |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 409 | `Conflict` |
| 500 | `INTERNAL SERVER ERROR` |

---

Login to an existing account :
```http
POST  /auth
```
The request should be a JSON in the form of
```javascript
{
  user  : string,
  pwd   : string
}
```

200 status code return `{accessToken : string}` which expires after 30 seconds. The refreshToken is set as a cookie which expires after 1 day.

other status code : 
| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 401 | `UNAUTHORIZED` |
| 500 | `INTERNAL SERVER ERROR` |

---

To get new accessToken :

```http
GET   /refresh
```
200 status code return `{accessToken : string}`

other status code : 
| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 401 | `UNAUTHORIZED` |
| 403 | `FORBIDDEN` |
| 500 | `INTERNAL SERVER ERROR` |

---


## License

licensed under the [MIT](LICENSE) License.

[Back To The Top](#tinyurl)
