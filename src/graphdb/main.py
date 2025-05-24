from neo4j import GraphDatabase
from dotenv import load_dotenv
import os

load_dotenv()

# Set your Neo4j URI and credentials
NEO4J_URI = "neo4j://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

# Create a driver instance
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

def create():
    summary = driver.execute_query("""
        CREATE (a:Term {name: $term})
        CREATE (b:Definition {name: $definition})
        CREATE (a)-[:DEFINED_AS]->(b)
        """,
        term="Docker", definition="A tool that makes it easier to create, share, and run applications",
        database_="neo4j",
    ).summary
    print("Created {nodes_created} nodes in {time} ms.".format(
        nodes_created=summary.counters.nodes_created,
        time=summary.result_available_after
    ))
def delete(value):
    # This does not delete _only_ p, but also all its relationships!
    records, summary, keys = driver.execute_query("""
        MATCH (p:Term {name: $name})
        DETACH DELETE p
        """, name={value},
        database_="neo4j",
    )
    print(f"Query counters: {summary.counters}. {records} {keys}")

# Execute query
def main():
    print('🏁 Start Query 🏁')
    create()
    # delete()
    print('🏁 Finished 🏁')

if __name__ == "__main__":
    main()
