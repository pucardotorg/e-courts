INSERT INTO eg_appconfig ( ID, KEY_NAME, DESCRIPTION, VERSION, MODULE ) VALUES (nextval('SEQ_EG_APPCONFIG'), 'COLLECTION_BANKREMITTANCE_FUNCTIONCODE','Collection Challan Validator Designation',0, (select id from eg_module where name='Collection')); 
INSERT INTO eg_appconfig_values ( ID, KEY_ID, EFFECTIVE_FROM, VALUE, VERSION ) VALUES (nextval('SEQ_EG_APPCONFIG_VALUES'),(SELECT id FROM EG_APPCONFIG WHERE KEY_NAME='COLLECTION_BANKREMITTANCE_FUNCTIONCODE'),current_date, '00030301',0);
