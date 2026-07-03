INSERT INTO users
(
username,
password_hash,
full_name,
email,
role_id
)

VALUES
(
'admin',

crypt('Admin@123',gen_salt('bf')),

'System Administrator',

'admin@strgims.local',

1
);