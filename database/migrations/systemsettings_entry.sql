INSERT INTO system_settings
(setting_name,setting_value,description)
VALUES
('application_name','STR GIMS Enterprise','Application Name'),

('version','1.0.0','Application Version'),

('geoserver_url',
'http://localhost:8595/geoserver',
'GeoServer URL'),

('postgrest_url',
'http://localhost:3000',
'REST API URL');