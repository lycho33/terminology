from flask import Flask, jsonify
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

api = Flask(__name__)

@api.route('/')
def hello_world():
    return '<p>🌤️ Hello 🌊, World! 🌏</p>'

@api.route('/terms', methods=['GET'])
def getAllTerms():
    # Gets the root node
    # Finds all paths from the root with any relationship (*) to any connected node
    # Returns a list of nodes in the path
    # Returns only unique nodes
    query = """
    MATCH (root:Term {name: 'Docker'})
    OPTIONAL MATCH path = (root)-[*]->(connected)
    UNWIND nodes(path) AS n
    RETURN DISTINCT n
    """


    # opens a new Neo4j session from the driver
    with driver.session(database="neo4j") as session:
        # run the query
        result = session.run(query)
        terms = []
        for node in result:
            # <Record n=<
                # Node 
                    # element_id='4:3f8bc559-256f-41fd-bbcc-dffc10397fa4:0' 
                    # labels=frozenset({'Term'}) 
                    # properties={'name': 'Docker'}
                # >
            # >
            # gets the actual Node object returned from Neo4j under the key "n"
            print(node)
            node = node["n"]
            terms.append({
                "id": node.id,
                "labels": list(node.labels),
                "properties": dict(node)
            })
        return jsonify(terms)

@api.route('/hello')
def hello():
    return 'Hello, World'

# This checks whether the current file is being run directly
if __name__ == '__main__':
    api.run(debug=True)