SET search_path TO str_gims,public;

CREATE TABLE reports
(
    report_id UUID
        PRIMARY KEY
        DEFAULT uuid_generate_v4(),

    report_name VARCHAR(150),

    report_type VARCHAR(50),

    generated_by UUID
        REFERENCES users(user_id),

    generated_on TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    file_name VARCHAR(250)
);