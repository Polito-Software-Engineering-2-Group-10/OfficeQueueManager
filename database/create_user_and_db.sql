-- Create the user if it doesn't exists:
DO
$do$
BEGIN
IF EXISTS (
    SELECT FROM pg_catalog.pg_roles
    WHERE rolname = 'officequeuemanager') THEN

    RAISE NOTICE 'User officequeuemanager already exists.';
ELSE
    CREATE ROLE officequeuemanager WITH
    LOGIN
    NOSUPERUSER
    INHERIT
    CREATEDB
    NOCREATEROLE
    NOREPLICATION
    PASSWORD 'officequeuemanager';
END IF;
END
$do$;

-- Create the database:
CREATE DATABASE officequeuemanager
    WITH OWNER = officequeuemanager
    ENCODING = 'UTF8'
    TABLESPACE = pg_default;