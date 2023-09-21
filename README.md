# Nestjs Kafka Test Server Project

Welcome to the Nestjs Kafka Test Server Project! This README provides instructions on how to install and run the project using Docker Compose. It also includes information about the API Swagger documentation and Kafka UI.

## Installation

To get started with this project, follow these steps:

**Clone the Repository**: Clone this GitHub repository to your local machine using the following command:

```bash
git clone https://github.com/mauwia/nestjs-kafka-test-server.git
```

**Navigate to Project Directory**: Change your current directory to the project folder:

```bash
cd nestjs-kafka-test-server
```

## Running with Docker Compose

You can run this project easily using Docker Compose, which sets up the required services and containers. Ensure that you have Docker and Docker Compose installed on your system.


**Start the Project**: : Open a terminal window and navigate to the project directory.

**Run Docker Compose**: Execute the following command to start the microservice project using Docker Compose:

```bash
docker-compose up
```
This command will download the necessary Docker images and start the project services.

**Wait for Initialization**: Allow some time for the services to initialize. Once everything is up and running, you can access the microservice.

## API Swagger Documentation

The API Swagger documentation is available at the following URL:

```bash
http://localhost:3000
```

You can use this documentation to explore the available API endpoints and test the functionality of the microservice.

## Kafka UI
The Kafka UI is accessible at the following URL:
```bash
http://localhost:9000
```
You can use this UI to monitor and manage Kafka topics and messages within the microservice.
## Entity Relationship Diagram (ERD)
Below is an Entity Relationship Diagram (ERD) that provides an overview of the project's database schema:

![erd](https://github.com/BlockApex/dafi-exchange-server/assets/40006578/9b9a5a63-75cb-4b4b-b2f3-6895c3bec943)


This diagram illustrates the relationships between various entities in the database and can be a helpful reference when working with the project's data.
## Shutdown

To stop the microservice project and its containers, press *Ctrl + C* in the terminal where *docker-compose up* is running. Then, run the following command to remove the containers:

```bash
docker-compose down
```
This will stop and remove the Docker containers, freeing up system resources.

That's it! You now have the NestJS microservice project up and running with Docker Compose. You can begin exploring the API and managing Kafka topics using the provided Swagger documentation and Kafka UI. If you encounter any issues, please refer to the project documentation or seek assistance from the project maintainers.

Feel free to contribute to this project and make it even better!