insert into equip_classes (id_name) values ('Combine-harvester');


insert into equips (model_class_id, id_name) values (1, 'Combine-harvester 1');
insert into equips (model_class_id, id_name) values (1, 'Combine-harvester 2');
insert into equips (model_class_id, id_name) values (1, 'Combine-harvester 3');


insert into requirement_classes (id_name, target_model_class_id, target_model_id) values ('Target performance', 1, 1);
insert into requirement_classes (id_name, target_model_class_id, target_model_id) values ('Target performance', 1, 2);
insert into requirement_classes (id_name, target_model_class_id, target_model_id) values ('Target performance', 1, 3);


insert into work_calendars (descr, begin_date, end_date) values ('Change', '2018-01-01T00:00', '2018-01-01T00:45');
insert into work_calendars (descr, begin_date, end_date) values ('Change', '2018-01-01T07:30', '2018-01-01T08:15');
insert into work_calendars (descr, begin_date, end_date) values ('Change', '2018-01-01T15:45', '2018-01-01T16:30');
insert into work_calendars (descr, begin_date, end_date) values ('Change', '2018-01-01T23:15', '2018-01-02T00:00');


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
insert into param_values (param_id, value, timestamp) values (3, '320', '2018-01-01T01:30');
insert into param_values (param_id, value, timestamp) values (3, '400', '2018-01-01T01:45');
insert into param_values (param_id, value, timestamp) values (3, '500', '2018-01-01T02:00');
insert into param_values (param_id, value, timestamp) values (3, '600', '2018-01-01T02:15');
insert into param_values (param_id, value, timestamp) values (3, '700', '2018-01-01T02:30');
insert into param_values (param_id, value, timestamp) values (3, '800', '2018-01-01T02:45');
insert into param_values (param_id, value, timestamp) values (3, '900', '2018-01-01T03:00');
insert into param_values (param_id, value, timestamp) values (3, '1000', '2018-01-01T03:15');
insert into param_values (param_id, value, timestamp) values (3, '1100', '2018-01-01T03:30');
insert into param_values (param_id, value, timestamp) values (3, '1210', '2018-01-01T03:45');
insert into param_values (param_id, value, timestamp) values (3, '1310', '2018-01-01T04:00');
insert into param_values (param_id, value, timestamp) values (3, '1410', '2018-01-01T04:15');
insert into param_values (param_id, value, timestamp) values (3, '1510', '2018-01-01T04:30');
insert into param_values (param_id, value, timestamp) values (3, '1620', '2018-01-01T04:45');
insert into param_values (param_id, value, timestamp) values (3, '1720', '2018-01-01T05:00');
insert into param_values (param_id, value, timestamp) values (3, '1830', '2018-01-01T05:15');
insert into param_values (param_id, value, timestamp) values (3, '1950', '2018-01-01T05:30');
insert into param_values (param_id, value, timestamp) values (3, '2050', '2018-01-01T05:45');
insert into param_values (param_id, value, timestamp) values (3, '2150', '2018-01-01T06:00');
insert into param_values (param_id, value, timestamp) values (3, '2260', '2018-01-01T06:15');
insert into param_values (param_id, value, timestamp) values (3, '2360', '2018-01-01T06:30');
insert into param_values (param_id, value, timestamp) values (3, '2450', '2018-01-01T06:45');
insert into param_values (param_id, value, timestamp) values (3, '2560', '2018-01-01T07:00');
insert into param_values (param_id, value, timestamp) values (3, '2660', '2018-01-01T07:15');
insert into param_values (param_id, value, timestamp) values (3, '2760', '2018-01-01T07:30');
insert into param_values (param_id, value, timestamp) values (3, '2760', '2018-01-01T07:45');
insert into param_values (param_id, value, timestamp) values (3, '2760', '2018-01-01T08:00');
insert into param_values (param_id, value, timestamp) values (3, '2760', '2018-01-01T08:15');
insert into param_values (param_id, value, timestamp) values (3, '2880', '2018-01-01T08:30');
insert into param_values (param_id, value, timestamp) values (3, '2980', '2018-01-01T08:45');




