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

def create_with_existing_node(type, value, relationship, existingNode, existingNodeType):
    result = driver.execute_query(f"""
        MATCH (a:`{existingNodeType}` {{name: $name}})
        CREATE (b:`{type}` {{name: $newValue}})
        CREATE (a)-[:{relationship}]->(b)
        RETURN a.name AS name
        """,
        name=existingNode,
        newValue=value,
        database_="neo4j"  # Optional if you use single database
    )

    # Extract data from result
    records = list(result.records) if hasattr(result, "records") else result
    if records:
        for record in records:
            print("Found name:", record["name"])
        print("Query summary:", result.summary)
    else:
        print("No matching record found.")

def create():
    summary = driver.execute_query("""
        CREATE (a:Term {name: $term})
        CREATE (b:Definition {definition: $definition})
        CREATE (a)-[:DEFINED_AS]->(b)
        """,
        term="Docker", definition="A tool that makes it easier to create, share, and run applications",
        database_="neo4j",
    ).summary
    print("Created {nodes_created} nodes in {time} ms.".format(
        nodes_created=summary.counters.nodes_created,
        time=summary.result_available_after
    ))

def delete(label, value):
    # This does not delete _only_ p, but also all its relationships!
    records, summary, keys = driver.execute_query(f"""
        MATCH (a:`{label}` {{name: $name}})
        DETACH DELETE a
        """, name=value,
        database_="neo4j",
    )
    print(f"Query counters: {summary.counters}. {records} {keys}")

# Execute query
def main():
    print('🏁 Start Query 🏁')
    create_with_existing_node("Term", "DockerFile", "RELATED_TO", "Docker", "Term")
    # create()
    # delete("Term", "DockerFile")
    print('🏁 Finished 🏁')

if __name__ == "__main__":
    main()
