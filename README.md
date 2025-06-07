## How to Run the app

API

```
cd ./src/api
. .venv/bin/activate
python run.py
```

### Docker

```
docker compose up
cd ./src/graphdb
python3 main.py
cd ./scr/api
. .venv/bin/activate --> Activate the environment
```

To Enter and exit venv

```
source venv/bin/activate
deactivate -- EXIT
```

### Setup Python Env

```
cd ./src/graphdb
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Now you will have your virtual python environment activated

To update run: `pip install --upgrade pip`

If an import cannot be resolved, try:

1. Cmd + Shift + P
2. Python: Select Interpreter
3. Select Python 3.13.3 ./src/api/.venv/bin/python

OR

Update the `settings.json` to use the correct bin path

#### Installing new packages in the API

1. cd src/api
2. pip install <package_name>
3. pip freeze > requirements.txt

##### Tech Stack

1. Neo4j
2. Flask API
3. Docker
