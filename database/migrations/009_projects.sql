SET search_path TO str_gims, public;

CREATE TABLE projects
(
    project_id UUID
        PRIMARY KEY
        DEFAULT uuid_generate_v4(),

    project_name VARCHAR(200) NOT NULL,

    description TEXT,

    start_date DATE,

    end_date DATE,

    status VARCHAR(30)
        DEFAULT 'Active',

    created_by UUID
        REFERENCES users(user_id),

    created_on TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
);