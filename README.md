# social-media
This project is a distributed social media application project, with event driven architecture. 

### Kubernetes
* The `sm-k8s` folder contains the objects code needed to deploy the microservices to kubernetes.
* The microservices are deployed to both `Minikube` and `AWS EKS Cluster`.

### Server
* The `server` folder contains all the backend code for the application's services.
* The services can be started either individually from the terminal or via docker compose.

### Volumes
* The `volumes` folder contains files that are used to run services for local development.
* [Volumes README file](https://github.com/LibenHailu/social-media/blob/main/volumes/README.md)

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

