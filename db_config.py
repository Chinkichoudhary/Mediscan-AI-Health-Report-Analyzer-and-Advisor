# db_config.py
# db_config.py (MySQL version)
import mysql.connector

DB_NAME = "mediscan"
DB_USER = "root"          # or your MySQL username
DB_PASSWORD = "chinki@0808"
DB_HOST = "localhost"
DB_PORT = "3306"          # default MySQL port

def get_connection():
    return mysql.connector.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )
