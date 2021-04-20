**FreeCodeCamp**- Information Security and Quality Assurance
------
![My preview](https://lh3.googleusercontent.com/7Z8YOflZZCMeu7E94YlCrMD4BWG58OpDx79pDoJ4BoMxd_qHuMQQSjrX2NMRuymOtPL9MAsaepuhzi-BxDc1-17oczcz6NzdQvMl-dNS9i2rlAgXaH33TdKYEOlegoG78R-DAbpdZQ=w2400)
The Project Issue Tracker can be found [here](https://issuetracker-fcccertif.glitch.me)

The project is the solution of the following [FreeCodeCamp exercise](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/issue-tracker)
- Complete the necessary routes in /routes/api.js
- Create all of the functional tests in tests/2_functional-tests.js
- A simple template for manual test cases can be found in the file tests/IT_TestCase.ods
- Postman test cases can be found in /tests/Issue Tracker.postman_collection.json
- Postman test results can be found in /tests/Issue Tracker.postman_test_run.json
- Copy the sample.env file to .env and set the variables appropriately
- To run the tests uncomment NODE_ENV=test in your .env file
- To run the tests in the console, use the command npm run test. To open the Repl.it console, press Ctrl+Shift+P (Cmd if on a Mac) and type "open shell"

Write the following tests in tests/2_functional-tests.js:

- Create an issue with every field: POST request to /api/issues/{project}
- Create an issue with only required fields: POST request to /api/issues/{project}
- Create an issue with missing required fields: POST request to /api/issues/{project}
- View issues on a project: GET request to /api/issues/{project}
- View issues on a project with one filter: GET request to /api/issues/{project}
- View issues on a project with multiple filters: GET request to /api/issues/{project}
- Update one field on an issue: PUT request to /api/issues/{project}
- Update multiple fields on an issue: PUT request to /api/issues/{project}
- Update an issue with missing _id: PUT request to /api/issues/{project}
- Update an issue with no fields to update: PUT request to /api/issues/{project}
- Update an issue with an invalid _id: PUT request to /api/issues/{project}
- Delete an issue: DELETE request to /api/issues/{project}
- Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
- Delete an issue with missing _id: DELETE request to /api/issues/{project}

