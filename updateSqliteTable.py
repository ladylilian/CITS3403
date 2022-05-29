import sqlite3

#Connection to the DB
conn = sqlite3.connect('players.db')

# Execute query on the sqlite DB
cur = conn.cursor()
cur.execute("SELECT * FROM players")

# Update desired field 
conn.execute("""UPDATE players SET max_score = 3000 where id = 3""")
conn.commit()

# Print everything from a table
rows = cur.fetchall()
for row in rows:
        print(row)

# close the DB connection 
conn.close() 