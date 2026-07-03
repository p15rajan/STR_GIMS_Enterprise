SET search_path TO str_gims,public;

CREATE TABLE announcements
(
    announcement_id UUID
        PRIMARY KEY
        DEFAULT uuid_generate_v4(),

    title VARCHAR(250),

    message TEXT,

    priority VARCHAR(20)
        DEFAULT 'Normal',

    start_date DATE,

    end_date DATE,

    active BOOLEAN
        DEFAULT TRUE,

    created_by UUID
        REFERENCES users(user_id),

    created_on TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP
);