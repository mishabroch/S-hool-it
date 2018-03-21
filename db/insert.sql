insert into equip_classes (id_name) values ('Combine-harvester');


insert into equips (model_class_id, id_name) values (1, 'Combine-harvester 1');
insert into equips (model_class_id, id_name) values (1, 'Combine-harvester 2');
insert into equips (model_class_id, id_name) values (1, 'Combine-harvester 3');


insert into requirement_classes (id_name, target_model_class_id, target_model_id) values ('Target performance', 1, 1);
insert into requirement_classes (id_name, target_model_class_id, target_model_id) values ('Target performance', 1, 2);
insert into requirement_classes (id_name, target_model_class_id, target_model_id) values ('Target performance', 1, 3);


insert into work_calendars (descr, begin_date, end_date) values ('Change', '2018-01-01T01:00', '2018-01-01T01:15');
insert into work_calendars (descr, begin_date, end_date) values ('Repair', '2018-01-01T01:15', '2018-01-01T05:00');
insert into work_calendars (descr, begin_date, end_date) values ('Working', '2018-01-01T05:00', '2018-01-01T09:00');
insert into work_calendars (descr, begin_date, end_date) values ('Change', '2018-01-01T09:00', '2018-01-01T09:15');
insert into work_calendars (descr, begin_date, end_date) values ('Working', '2018-01-01T09:15', '2018-01-01T17:00');
insert into work_calendars (descr, begin_date, end_date) values ('Change', '2018-01-01T17:00', '2018-01-01T17:15');
insert into work_calendars (descr, begin_date, end_date) values ('Working', '2018-01-01T17:15', '2018-01-02T01:00');


insert into params (name, equip_id) values ('Max speed', 1);
insert into params (name, equip_id) values ('Date production', 1);
insert into params (name, equip_id) values ('Current production', 1);



insert into param_values (param_id, value) values (1, '10');
insert into param_values (param_id, value, timestamp) values (2, '10000', '2018-01-01T00:00');
insert into param_values (param_id, value, timestamp) values (3, '0', '2018-01-01T00:00');
insert into param_values (param_id, value, timestamp) values (3, '0', '2018-01-01T00:15');
insert into param_values (param_id, value, timestamp) values (3, '0', '2018-01-01T00:30');
insert into param_values (param_id, value, timestamp) values (3, '0', '2018-01-01T00:45');
insert into param_values (param_id, value, timestamp) values (3, '120', '2018-01-01T01:00');
insert into param_values (param_id, value, timestamp) values (3, '250', '2018-01-01T01:15');
insert into param_values (param_id, value, timestamp) values (3, '300', '2018-01-01T01:30');
insert into param_values (param_id, value, timestamp) values (3, '390', '2018-01-01T01:45');
insert into param_values (param_id, value, timestamp) values (3, '500', '2018-01-01T02:00');
insert into param_values (param_id, value, timestamp) values (3, '610', '2018-01-01T02:15');
insert into param_values (param_id, value, timestamp) values (3, '730', '2018-01-01T02:30');
insert into param_values (param_id, value, timestamp) values (3, '830', '2018-01-01T02:45');
insert into param_values (param_id, value, timestamp) values (3, '950', '2018-01-01T03:00');
insert into param_values (param_id, value, timestamp) values (3, '1060', '2018-01-01T03:15');
insert into param_values (param_id, value, timestamp) values (3, '1170', '2018-01-01T03:30');
insert into param_values (param_id, value, timestamp) values (3, '1300', '2018-01-01T03:45');

