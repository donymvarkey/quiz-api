### Environment Setup

1. Clone the repo.
   ```bash
   $ git clone https://github.com/donymvarkey/quiz-api.git
   ```
2. Install the dependencies with npm.
   ```bash
   $ cd quiz-api
   $ npm i
   ```
3. Create a `.env` file in the project root directory and add the following contents.
   ```
   PORT=5000
   SIGNATURE="j+PPRMUwtEWIF84RW0+EAx1A/DslXrM2zek/91E2ioU="
   MONGO_URL="mongodb://localhost:27017/quiz"
   ```
4. Run the node development server
   ```bash
   $ npm run dev
   ```
   You should see the following output in the terminal
   ```json
   {"level":"info","message":"Listening on http://localhost:5000"}
   {"level":"info","message":"Connected to MongoDB instance"}
   ```

### Postman Collections are also provideded in the docs dirfectory

### For api documentation head over to [Api Docs](./docs/api-docs.md)
