SET search_path TO str_gims;

CREATE TABLE roles
(
    role_id SMALLSERIAL PRIMARY KEY,

    role_name VARCHAR(40)
        UNIQUE
        NOT NULL,

    description TEXT,

    created_on TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles(role_name,description)
VALUES
('Administrator','Full access'),
('GIS Officer','Manage GIS layers'),
('Forest Officer','Manage inventories'),
('Researcher','Read and reports'),
('Viewer','Read only');