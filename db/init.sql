-- create schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS fullstacknextjs;

-- create table inside that schema
CREATE TABLE IF NOT EXISTS fullstacknextjs.feedback
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  comment VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
