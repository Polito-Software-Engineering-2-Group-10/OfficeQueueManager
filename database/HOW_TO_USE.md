# Steps to create the database
## If you are on Windows, you can use the provided powershell script `create_and_init_db.ps1`.
This script will automatically drop the database and user if they exist already, and recreate everything inserting the data.

The script is called like so `.\create_and_init_db.ps1` in a powershell terminal opened in this folder.

It will ask for your postgres password and then do everything automatically.
In case anything goes wrong, you can run the sql scripts manually following the steps below.
## This guide assumes that you have a working installation of PostgreSQL
1. Open a terminal in this folder
2. Run `psql -U postgres` to enter the PostgreSQL shell, you might need to add the path to the bin folder of your PostgreSQL installation to your PATH environment variable ([guide if you don't know how to do it](https://stackoverflow.com/questions/30401460/postgres-psql-not-recognized-as-an-internal-or-external-command)).
2. Run `\i create_user_and_db.sql` to create the user and database
3. Run `\c officequeuemanager` to connect to the database
4. Run `\i create_tables.sql` to create the tables
5. Run `\i init_data.sql` to insert the data

Alternatively you can try using PGAdmin (the GUI for PostgreSQL) to run the sql scripts but I find it easier to use the shell.


