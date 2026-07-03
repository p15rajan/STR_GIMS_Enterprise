CREATE TABLE audit_log
(
    audit_id BIGSERIAL PRIMARY KEY,

    user_id UUID,

    action VARCHAR(100),

    table_name VARCHAR(80),

    record_id TEXT,

    action_time TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    ip_address VARCHAR(50)
);