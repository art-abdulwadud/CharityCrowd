<p align="center">
  <a href="https://charitycrowd-ke.web.app/">
    <img alt="logo" src="https://charitycrowd-ke.web.app/favicon.webp" width="60" />
  </a>
</p>
<h1 align="center">
  CharityCrowd
</h1>

Welcome to the frontend repository of CharityCrowd, a platform that empowers users to fund projects and make a positive impact. This frontend is built using Gatsby, providing a fast and modern user interface for the CharityCrowd application.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User-friendly Interface:**
  - Gatsby provides a smooth and performant user experience.
- **Project Visualization:**
  - Display projects in an engaging and organized manner.
  - Provide an intuitive interface for users to contribute to projects.
- **Responsive Design:**
  - Ensure a seamless experience across various devices.

## Getting Started

### Prerequisites

- Node.js (version 18)
- npm or yarn

### Installation

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/art-abdulwadud/CharityCrowd
   cd CharityCrowd-Server
   yarn or npm install
   ```
2. Set up environment variables
3. Run the server:
  ```bash
  yarn start or yarn dev
  ```

### Configuration

Set up your environment variables in .env.development and .env.production file:

```env
GATSBY_apiKey = ""
GATSBY_authDomain = ""
GATSBY_projectId = ""
GATSBY_storageBucket = ""
GATSBY_messagingSenderId = ""
GATSBY_appId = ""
GATSBY_measurementId = ""
```

Make sure to replace the placeholder values with your actual configuration. Each variable should start with ```GATSBY_```

### Usage

The frontend communicates with the CharityCrowd backend to fetch and display project information. Ensure the backend is running and configure the API URL in the environment variables.

### Folder Structure

A quick look at the top-level files and directories you'll see in this project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .env.development
    ├── .env.production
    ├── .prettierrc
    ├── .prettierignore
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── yarn.lock
    ├── package.json
    └── README.md

### License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/art-abdulwadud/CharityCrowd/blob/main/LICENSE) file for details.