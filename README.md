## Usage
To interact with the analytics dataset, please install [Postman](https://www.postman.com) to send requests using the following endpoints:

**Please note**: when sending a POST or PATCH request, the req body should be formatted in JSON or else, the server will not parse the body which will lead to a status of 400(bad request)



| REQUEST  | Endpoints |
| ------------- | ------------- |
| GET | https://analytics-dataset-api.herokuapp.com/customers |
| POST  | https://analytics-dataset-api.herokuapp.com/customers |
| PATCH | https://analytics-dataset-api.herokuapp.com/customers/username |
| DELETE | https://analytics-dataset-api.herokuapp.com/customers/username | 


## Wrap Up Notes
- Time length to complete the tasks: 7-8 hours 
   - First time deploying to Heroku which took longer than expected due to an application error I encountered
- If this were to be deployed in production, I would've created a UI to interact with the server
