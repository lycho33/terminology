## Start

```
pnpm start
```

### Migrate DB

```
npx prisma migrate dev --name <migration name>
```

### Update Schema

```
npx prisma db pull
```

### Seed data

```
pnpm db:restart
```

## How to Run the app

Currently there are 2 ways to run the application.

1. Docker
2. Kubernetes

### Docker

```
docker compose up
cd ./src/graphdb
python3 main.py
```

To Enter and exit venv

```
source venv/bin/activate
deactivate -- EXIT
```

### Kubernetes

There is a pod deployed with a port exposed via the service. To see the resources, run `minikube dashboard` or to expose the pod to access the application:

```
minikube service terminology
minikube service terminology --url
```

### Setup Python Env

```
cd ./src/graphdb
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Now you will have your virtual python environment activated

##### Tech Stack

1. Neo4j
2. Express.js
3. Kubernetes
4. Docker
