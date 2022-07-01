# Secret Family Recipes Cookbook

[Front-End Repository](https://github.com/joeys1122/secret-family-recipes-front-end)

[Deployed Heroku API](https://bw50-secret-family-recipes.herokuapp.com/)

## API Endpoints

**Authentication**

| Method  | Endpoint | Body(Required) |
| ------- | -------- | -------------- |
| POST  | /api/auth/register  | username, password |
| POST  | /api/auth/login | username, password |

**Users**

| Method  | Endpoint | Body(Required) |
| ------- | -------- | -------------- |
| GET  | /api/users  | N/A |

**Recipes**

| Method  | Endpoint | Body(Required) |
| ------- | -------- | -------------- |
| GET  | /api/recipes  | N/A |
| GET  | /api/recipes/:recipe_id | N/A |
| POST  | /api/recipes  | title, source, instructions, ingredients, categories |
| PUT  | /api/recipes/:recipe_id  | title, source, instructions, ingredients, categories |
| DELETE  | /api/recipes/:recipe_id  | N/A |

## Scripts

- **start** Runs the app with Node.
- **server** Runs the app with Nodemon.
- **migrate:dev** Migrates the local development db to the latest.
- **rollback:dev** Rolls back migrations in the local dev db.
- **seed:dev** Truncates all tables in the local dev db.
- **deploy** Deploys the main branch to Heroku. Must login to the Heroku CLI and add Heroku as a remote.
- **test** Runs tests.
- **migrate:prod** Migrates the Heroku database to the latest.
- **rollback:prod** Rolls back migrations in the Heroku database.
- **databaseh** Interacts with the Heroku database from the command line using psql.
- **seed:prod** Runs all seeds in the Heroku database.
