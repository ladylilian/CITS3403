import sqlite3

#Connection to the DB
conn = sqlite3.connect('players.db')

# Update desired field 
conn.execute("""UPDATE players SET max_score = 1000 where id = 1""")
conn.execute("""UPDATE players SET max_score = 200 where id = 2""")
conn.execute("""UPDATE players SET max_score = 3000 where id = 3""")
conn.execute("""UPDATE players SET current_score = 3000 where id = 3""")
conn.commit()

# Execute query on the sqlite DB
cur = conn.cursor()
cur.execute("SELECT * FROM players")

# Print everything from a table
rows = cur.fetchall()
for row in rows:
        print(row)

# close the DB connection 
conn.close() 