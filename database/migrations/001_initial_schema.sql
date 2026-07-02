CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE SCHEMA IF NOT EXISTS str_gims;

COMMENT ON SCHEMA str_gims IS
'Spatial Tiger Reserve Geographic Information Management System';