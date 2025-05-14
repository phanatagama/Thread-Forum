![Thread-Forum](https://socialify.git.ci/phanatagama/Thread-Forum/image?custom_description=RESTful+APIs+with+Test-Drive+Development&description=1&font=KoHo&forks=1&issues=1&language=1&name=1&pattern=Charlie+Brown&pulls=1&stargazers=1&theme=Auto)

# Submission: MBDE 2025

This repository contains the submission for the **Menjadi Backend Developer Expert 2025** project. The project is part of the requirements for completing the Dicoding course.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [License](#license)

## Overview
This project demonstrates the implementation of a Test Drive Development to build RESTful APIs with NodeJs.

## Features
- Create an threads post.
- View thread detail information.
- Register and authentication users with JSON Web Token (JWT).
- Make an comment on threads.
- Delete comment on threads.

## Technologies
- NodeJS
- HapiJS
- Jest
- PostgreSQL

## Setup
1. Clone this repository:
    ```bash
    git clone https://github.com/phanatagama/Thread-Forum.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Thread-Forum
    ```
3. Run the following command to install dependencies.
    ```bash
    pnpm i
    ```
4. Make .env file by copying .env.copy:
    ```bash
    cp .env .env.copy
    ```
5. Prepare your postgree and migrate with the following command:
    ```bash
    pnpm migrate up
    ```
6. Start the project by run these code:
    ```bash
    pnpm start:dev 
    # or
    # pnpm test:watch
    ```

## Usage
You can access the /postman folder to test the API with postman.
| No | Method | Endpoint                      | Description          |
|----|--------|-------------------------------|----------------------|
| 1  | POST   | /users                        | create users         |
| 2  | POST   | /authentications              | login to account     |
| 3  | PUT    | /authentications              | update refresh token |
| 4  | DELETE | /authentications              | logout               |
| 5  | POST   | /threads                      | create a thread      |
| 6  | GET    | /threads/{commentId}/comments | get thread detail    |
| 7  | POST   | /threads/{commentId}/comments | create comment       |
| 8  | DELETE | /threads/{commentId}/comments | delete comment       |

## License
This project is licensed under the [MIT License](LICENSE).

Feel free to contribute or provide feedback to improve the project!