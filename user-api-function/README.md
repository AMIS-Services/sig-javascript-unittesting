# Sample REST API

> Note: you can use the example with the REST client VScode plugin.

> See also openapi definition [user-api-swagger.yml](user-api-swagger.yml).

## Get list of users
Endpoint: `GET /v1/users`
Example:
```
GET http://localhost:7071/api/v1/users
```

## Get single user
Endpoint: `GET /v1/user/{id}`
Example:
```
GET http://localhost:7071/api/v1/user/2
```

## Create a new user
Endpoint: `POST /v1/user`

Example:
```
POST http://localhost:7071/api/v1/user HTTP/1.1
content-type: application/json

{
  "firstname": "Jan",
  "lastname": "Janszen",
  "prefix": null,
  "street": "Dorpstraat",
  "houseno": 14,
  "postalcode": "9888AC",
  "city": "Ons Dorp",
  "country": null,
  "phone1": null,
  "phone2": null,
  "email1": "jan.janszen@example.com",
  "email2": null
}
```

## Database
The users are stored in a PostgreSQL database in the table 'users'.

### DDL script
```sql
create table public.users (
	id serial primary key,
	firstname varchar not null,
	lastname varchar not null,
	prefix varchar null,
	street varchar not null,
	houseno int not null,
	houseno_suffix varchar null,
	postalcode varchar not null,
	city varchar not null,
	country varchar null,
	phone1 varchar null,
	phone2 varchar null,
	email1 varchar not null,
	email2 varchar null,
	date_created timestamp with time zone not null default ( now() at time zone 'utc'),
	date_modified timestamp with time zone not null
);
```

### Example insert script:
```sql
INSERT INTO public.users(firstname, lastname,  street, houseno, houseno_suffix, postalcode, city, email1, date_modified)
VALUES ('Jan', 'Janszen', 'Dorpstraat', 10, 'a', '9888AC', 'Ons Dorp', 'jan.janszen@example.com', now());
```

# Setup for Developers
## Requirements
- Visual Studio Code
- NodeJS 12.x or 14.x
- [Azure Function Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local) 
- VSCode ESLint plugin
- VSCode Azure functions plugin when actually updating / running the code
- Docker + docker-compose for running the database locally

## Local environment setup
- Run `npm install` to install the dependencies. Or `npm update` to update the existing npm module versions to the latest patch version.
- Use `npm-check` to check the current dependencies if they need to be updated. Install using `npm install -g npm-check`.
- Open this folder seperately in a new window
- Initialize for use in vscode using the command `Azure functions: Initialize project for Use with vscode` and select the current folder
- If you press `F5` the function will be started (if you have the core tools installed)
- See below for running the Postgresql db

## Unittests
Create a `.env` file with the following contents:
```
WEBSITE_SITE_NAME=user-api-local
DEBUG=USERAPI
DBHOST=localhost
DBPORT=5432
DBUSER=dbadmin
DBPASSWORD="pgpass@123"
DBNAME=mydb
```
Run `npm test` in the project rootfolder.

## Database
For running against an actual database, use the `docker-compose.yml` file to create a PostgreSQL instance including pgAdmin:
Run `docker-compose up -d` to start the containers.
Run `docker-compose down` to stop and remove the containers.
Run `docker-compose down -v` to stop and remove the containers including the volumes.

Create the table using the DDL script mentioned above.
Start PGAdmin4 by navigating to the url http://localhost and login with the credentials as giving in the docker-compose file.
Initially add a new server. Give it a name and for the connection:
- Host: pg11
- Maintenance database: <database from docker-compose.yml>
- Username: <username from docker-compose.yml>
- Password: <password from docker-compose.yml>

## Running locally
You need to have the Azure Function core tools to be installed.
And start the debugger (F5) or in the terminal windows run `func start`.
Create a `local.settings.json` file with the following contents:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "WEBSITE_SITE_NAME": "user-api-local",
    "DEBUG": "USERAPI",
    "DBHOST": "localhost",
    "DBPORT": "5432",
    "DBUSER": "dbadmin",
    "DBPASSWORD": "pgpass@123",
    "DBNAME": "mydb"
  }
}
```

## Additional information

* [Jest](https://jestjs.io/)
* [Azure functions](https://docs.microsoft.com/en-us/azure/azure-functions/)
* [Azure functions using Javascript](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node)
* [PostgreSQL v11](https://www.postgresql.org/docs/11/index.html)
* [PostgreSQL npm library](https://node-postgres.com/)

# Version History

| Version | Date       | Notes |
|---------|------------|-------|
| 1.0     | 2021-09-23 | Initial version |
