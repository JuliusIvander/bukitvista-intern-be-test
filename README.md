## Bukit Vista Programmer Test - Node Js Back End

### About Study Case

In this study case there are 2 user stories:

1. User want to create private API server that will return image url of movie poster, using third party service OMDB to get that url.
2. User need to be able to fetch all poster of their own favorite movies.

### Technology Stacks

- [Express] (https://expressjs.com/)
- [Sequelize] (https://sequelize.org/)
- [POSTMAN : For my testing purpose](https://www.postman.com/)
- [Laragon/HeidiSQL : For my local database](https://laragon.org/)

### Getting Started

- Clone the repository

```
git clone https://github.com/JuliusIvander/bukitvista-intern-be-test.git
```

- Entering the directory and install depedencies

```
npm install
```

- Duplicate `.env.example` and rename it into `.env`
- Edit and fill `.env` with format:

```
DB_NAME = database_name
DB_USERNAME = database_username
DB_PASSWORD = database_password
JWT_SECRET = jwt_secret_token
API_KEY = OMDB_api_key
```

- After successfully install all the dependency and filling the `.env`, run the project

```
npm run dev
```

- You can access the backend API in `http://localhost:5000`

### Documentations

In this API, there are 6 endpoints

1. `POST /auth/login`
2. `POST /auth/register`
3. `GET /movies`
4. `GET /movies/:title`
5. `GET /movies/favorite`
6. `POST /movies/favorite`

Detailed documentation: [https://documenter.getpostman.com/view/10484939/UVXhqc5X](https://documenter.getpostman.com/view/10484939/UVXhqc5X)
