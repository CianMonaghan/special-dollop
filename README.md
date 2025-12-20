# special-dollop

Very simple database modifier. You can add data to the database and retrieve it from the database for view. This is intended to be used for Dungeons and Dragons races.

You can add a race's data into the database by filling out the form and pressing the "Save" button. You can retrieve data from the database for view by inputting the name of the race you seek to retrieve and pressing the "Retieve from database" button.

DIFFERENCES BETWEEN MONGODB AND SQL

The database used in this project is MongoDB. MongoDB works differently from other databases we have learned about in this class because it doesn't use relational algebra. Instead, it uses JSON-like files called BSON (Binary JSON) to store information. That means that doing search queries on a MongoDB database are somewhat easier than in database schema like SQL. A simple search query in MongoDB would be something like: { name: "Bob" } to find all files that have the name "Bob". This means it's a bit easier to take data from a form and add it into a database than in SQL. Now, instead of parsing our forms into a structure which SQL can take (such as SFW clauses), we can instead just put the data into a JSON file and put it right into the database.

Since my program uses a form that translates well into JSON files, MongoDB was a natural choice for my database.
