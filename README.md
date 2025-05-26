<h1 align="center">SOCIAL-MEDIA</h1>

<p align="center"><i>Connect, Share, Engage: Transform Your Social Experience</i></p>

<p align="center">
  <img src="https://img.shields.io/badge/last%20commit-today-black?style=flat-square" />
  <img src="https://img.shields.io/badge/typescript-93.4%25-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/languages-5-blue?style=flat-square" />
</p>

---

### 🛠 Built with the tools and technologies:

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/JSON-black?style=for-the-badge&logo=json&logoColor=white" />
  <img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" />
  <img src="https://img.shields.io/badge/.ENV-yellow?style=for-the-badge" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <br />
  <img src="https://img.shields.io/badge/GNU%20Bash-4EAA25?style=for-the-badge&logo=gnubash&logoColor=white" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/tsnode-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
  <br />
  <img src="https://img.shields.io/badge/EJS-8FBC8F?style=for-the-badge&logo=ejs&logoColor=white" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/YAML-CB171E?style=for-the-badge&logo=yaml&logoColor=white" />
    <br />
  <img src="https://img.shields.io/badge/Elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white" />
  <img src="https://img.shields.io/badge/Kibana-E8478B?style=for-the-badge&logo=kibana&logoColor=white" />
  <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white" />
  <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white" />

</p>


# Overview
This project is a distributed social media application project, with event driven architecture. 

Core functionaries include

- 🚀 **Distributed Architecture**: Supports scalability and resilience.
- 📘 **Event-Driven Design**: Facilitates real-time interactions, enhancing user engagement and responsiveness.
- ☁️ **Microservices Deployment with Kubernetes**: Simplifies management and orchestration of services.
- 🛠️ **Health Monitoring with Heartbeat**: Ensures system reliability by continuously checking service health.
- 📊 **Centralized Logging with Elasticsearch**: observability and debugging capabilities, making it easier to track issues.
- 💬 **Real-Time Messaging with WebSockets**: Provides instant messaging features, crucial for social media applications.

### Kubernetes
* The `sm-k8s` folder contains the objects code needed to deploy the microservices to kubernetes.
* The microservices are deployed to both `Minikube` and `AWS EKS Cluster`.

### Server
* The `server` folder contains all the backend code for the application's services.
* The services can be started either individually from the terminal or via docker compose.

### Volumes
* The `volumes` folder contains files that are used to run services for local development.
* [Volumes README file](https://github.com/LibenHailu/social-media/blob/main/volumes/README.md)

## Installation

Build **social-media** from the source and install dependencies:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/LibenHailu/social-media
2. **Navigate to social-media directory**:
   ```bash
   cd social-media

## Running Locally
* To start the services locally, you need to first start the required services inside the docker compose file.
* `redis`
  * `docker compose up -d redis`
* `mongodb`
  * `docker compose up -d mongodb`
* `mysql`
  * `docker compose up -d mysql`
* `rabbitmq`
  * `docker compose up -d redis`
* `elasticsearch`
  * `docker compose up -d elasticsearch`

* [Volumes README file](https://github.com/LibenHailu/social-media/blob/main/volumes/README.md)

Please start the microservices.
* `follow service`
* `reaction service`
* `chat service`
* `post service`
* `users service`
* `auth service`
* `notification service`
* Before you start the `gateway service`, make sure all other services are running without errors.

### Running 

Navigate to each service folder.

```
npm run dev
```

### Running with docker 

```
docker compose up -d follow reaction chat post users auth notification 
```  
