SET search_path TO str_gims, public;

CREATE TABLE users
(
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(120),
    email VARCHAR(120),
    mobile VARCHAR(20),
    role_id SMALLINT REFERENCES roles(role_id),
    active BOOLEAN DEFAULT TRUE,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);
