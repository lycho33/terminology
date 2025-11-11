## Running the Graph

1. Run the container: `docker compose up -d`
2. Access the console: `http://localhost:7474/browser/`
3. Access [neo4j Aurora](https://console-preview.neo4j.io/tools/explore) for graph tools such as visualization, data exploration, and monitoring
4.

## Run the API

```
fastapi dev main.py
```

Path: http://127.0.0.1:8000

### Tech Stack

- Neo4j: database
- FastAPI: API

#### Reference

- [API Documentation](http://127.0.0.1:8000/docs)

#### Terms

- Bolt port: the TCP port where Neo4j’s binary Bolt protocol listens for database driver connections
  - Driver sends a Bolt handshake
- Port 7474: hosts the Neo4j browser/HTTP API
- Port 7687: Bolt port to execute queries over TCP or websocket connections
