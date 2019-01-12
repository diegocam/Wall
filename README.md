# Wall - Frontend

## Description

This application is a fun/simple version of a social media "wall", where a user can create posts and have other users provide comments per post. 

This is purely the front-end of the application built usint React. It connects to an API by providing it environment configs.

### Prereqs:

* [Git Client](https://git-scm.com/downloads)
* [Yarn](https://yarnpkg.com/en/)

### Installation:

1. Clone this repo to your local environment using Git
    ```
    git clone https://github.com/diegocam/Wall.git
    ```

2. Install all needed dependencies with Yarn: 

    ```
    yarn -i
    ```
2. Make a copy of `.env.example` and name it `.env`. This file will contain information to connect to the API.

3. Run your application
    ```
    yarn run start
    ```

#### Note:
Keep in mind that the application will not be fully functional until a established connection with the API is made. The API is located here: https://github.com/diegocam/WallAPI