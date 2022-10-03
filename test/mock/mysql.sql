-- drop database `test-ppz`;
create database `test-ppz`;
use `test-ppz`;

create table date (
  id int primary key,
  date date,
  time time,
  datetime datetime,
  timestamp timestamp
);
insert into date values (1, '2022-10-3', '16:37:8', '2022-10-3 16:37:8', '2022-10-3 16:37:8');

create table `date-fractional` (
  id int primary key,
  
  datetime1 datetime(1),
  datetime2 datetime(2),
  datetime3 datetime(3),
  datetime4 datetime(4),
  datetime5 datetime(5),
  datetime6 datetime(6),
  
  timestamp1 timestamp(1),
  timestamp2 timestamp(2),
  timestamp3 timestamp(3),
  timestamp4 timestamp(4),
  timestamp5 timestamp(5),
  timestamp6 timestamp(6)
);
insert into `date-fractional` values (1,
'2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456',
'2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456',
'2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456',
'2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456','2022-10-3 16:37:8.123456'
);