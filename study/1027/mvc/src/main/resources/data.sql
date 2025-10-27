insert into member (id, name) values (1, 'ㅇㅣ름1');
insert into member (id, name) values (2, 'ㅇㅣ름2');
insert into member (id, name) values (3, 'ㅇㅣ름3');

# workbench sql example

# db 생성 및 삭제
create database ktcloud;

use ktcloud;

drop database ktcloud;

# table 생성 및 삭제
create table doit_create_table (
col_1 INT,
col_2 VARCHAR(50),
col_3 DATETIME
);

drop table doit_create_table;

# C insert, R select, U update, D delete 실습
create table doit_dml (
col_1 INT,
col_2 VARCHAR(50),
col_3 DATETIME
);

insert into doit_dml
(col_1, col_2, col_3)
values
(1, 'DoItSQL', '2025-10-27');

select * from doit_dml;

insert into doit_dml
(col_2)
values
('DoItSQL');

update doit_dml SET col_2 = '데이터 수정'
where col_1 = 1;

delete from doit_dml
where col_2 = 'DoItSQL';

select * from doit_dml
where col_1 = 1
group by col_2
order by col_3
limit 1, 10;

# create member table
create table member(
id int primary key,
name varchar(255)
);

insert into member (id, name) values (1, 'ㅇㅣ름1');
insert into member (id, name) values (2, 'ㅇㅣ름2');
insert into member (id, name) values (3, 'ㅇㅣ름3');

select * from member;