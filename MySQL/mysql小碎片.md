1. `select distinct`语句用于返回不同的值。

示例：

+ 没有distinct

```sql
SELECT Country FROM Customers;
# 从“Customers”表的“Country”列中选择所有（包括重复项）值
```

+ 有distinct

```sql
SELECT DISTINCT Country FROM Customers;
# 计算并返回“Customers”表中不同国家/地区的数量
```

2. 当你想用某一个`schema`进行数据的操作时，你应该使用：

```sql
use <schema_name>
```

3. 查询表结构：`desc <table_name>`
4. 查询指定表的建表语句：`show create table <table_name>`
5. 建表语句(demo)：

```sql
create table emp
(
    id        int comment '编号',
    workNum   varchar(10) comment '工号',
    gender    varchar(1) comment '性别',
    age       tinyint unsigned comment '年龄',
    idCard    char(18) comment '身份证号',
    entryDate date comment '入职时间',
    name      varchar(50) comment '年龄'
) comment '员工表';
```

6. 添加字段

```sql
alter table <table_name>
  add <字段名> <数据类型> comment 'xxx'; 

# 例如：
alter table emp
    add name varchar(10) comment '姓名'; # 添加字段
```

7. 修改字段

```sql
alter table <table_name>
  modify <字段名> <数据类型> comment 'xxx';

# 例如：
alter table emp
    modify name varchar(20) comment '姓名';
```

8. 使用`change`修改字段

```sql
# 更改数据类型
# 修改字段名和字段类型
alter table <table_name>
  change <原来的字段名> <修改之后的字段名> <数据类型> comment'';

# example:
alter table emp
    change name nickname varchar(10) comment '姓名';
```

9. 删除字段(drop)

```sql
# 删除字段
alter table <table_name>
  drop <字段名>

# example:
alter table emp
    drop name;
```

10. 修改表名(rename to)

```sql
# 修改表名
alter table <原表名> rename to <修改之后的表名>

# example:
alter table emp rename to employee;
```

11. 删除表并重新创建(truncate)

```sql
# 删除表，并重新创建
truncate table tb_user; 
```

12. 添加（插入）信息（insert）

```sql
insert into tb_user (id, name, age, gender)
values (1, 'David', 20, '男');

insert into tb_user (id, name, age, gender)
values (2, 'Peter', 21, '女');

insert into tb_user (id, name, age, gender) value (3, 'sam', 23, '男');
insert into tb_user (id, name, age, gender) value (4, 'zhangsan', 23, '男');
insert into tb_user (id, name, age, gender) value (5, 'lisi', 24, '女');
insert into tb_user (id, name, age, gender) value (6, 'wangwu', 25, '男');
insert into tb_user (id, name, age, gender) value (7, 'lin', 20, '男');
```

13. 修改数据(update ... set)

```sql
-- 修改数据
update tb_user
set name = 'lian'
where id = 1;
# 修改语句的条件可有可无，如果没有则修改整张表
```

14. 删除

```sql
delete
from tb_user
where id = 1;


delete
from dept
where id = 1; # 删除一行

# 删除一列
alter table emp
    drop column id;
```

15. 一些运算符

```sql
# 去重关键字 distinct
# select distinct emp.workAddress '工作地址' from emp;
select distinct gender
from emp;

select *
from emp
where age > 80;

select *
from emp
where age < 20;

select *
from emp
where age <= 20;

select *
from emp
where idCard is null;

select *
from emp
where idCard is not null;

select *
from emp
where age != 88;

select *
from emp
where age <> 88;

select *
from emp
where 15 <= age
  and age <= 20;

select *
from emp
where gender = '女'
  and age < 25;

select *
from emp
where age = 18
   or age = 20
   or age = 40;

-- 下面这条语句的逻辑是错误的。age = 18 or 20 or 40 被 MySQL 解释为 age = 18 or TRUE or TRUE
-- 所以查寻返回的是全部数据
select *
from emp
where age = 18
   or 20
   or 40;

-- 可以使用以下语句：
SELECT *
FROM emp
WHERE age IN (18, 20, 40);
```

16. 通配符( '_'  和 '%' )

```sql
-- '_' 匹配一个字符，'%'匹配任意字符
select *
from emp
where name like '__';
select *
from emp
where name like '%';

select *
from emp
where idCard like '%x';
select *
from emp
where idCard like '_________________x';
```

17. 聚合函数

```sql
select count(age)
from emp; # 统计数量

select avg(age)
from emp; # 求平均值

select min(age)
from emp; # 求最小值

select max(age)
from emp; # 求最大值

select sum(age)
from emp; # 求和


# example:


# COUNT(字段名)：统计指定字段中非 NULL 值的记录数。如果某个字段的值为 NULL，则不计入结果
select count(idCard)
from emp; # 统计的是idCard字段不为null的记录数

select count(1)
from emp;
select count(*)
from emp;
select count(id)
from emp;

select avg(age)
from emp;
select max(age)
from emp;
select min(age)
from emp;

# select sum(age) from emp where workAddress = '西安';


select gender, avg(age)
from emp
group by gender;
```

18. `group by`

GROUP BY 主要用于对查询结果进行分组后再进行聚合计算。它会将具有相同特征的数据行归为一组，然后可以使用聚合函数（如 COUNT、SUM、AVG、MIN、MAX 等）对每个分组进行计算，得到汇总结果。

```sql
SELECT 列1, 聚合函数(列2)
FROM 表名
WHERE 条件
GROUP BY 列1;

# example
select gender, count(*)
from emp
group by gender;
```

• GROUP BY 后面的字段通常是用来“分组”的依据。例如按部门分组，或按年份分组。  
• SELECT 中除了聚合函数应用的字段之外，其余出现的字段一般需要出现在 GROUP BY 中，否则大多数数据库会报错或得到不确定的结果。  
• 可以配合 HAVING 子句过滤分组后的结果（对聚合函数结果进行约束），类似于 WHERE，但作用在分组结果上。

19. `as`别名

```sql
select gender, count(gender) as '数量'
from emp
group by gender;
select gender, count(*) as '数量'
from emp
group by gender;

select gender, avg(age) as '平均年龄'
from emp
group by gender;
```

20. `having`

`having` 子句常与 `group by` 搭配使用，用于对分组后的聚合结果进行筛选，效果类似于 WHERE 但作用于聚合后的结果集。换句话说：

• WHERE 针对原始数据进行筛选；  
• HAVING 针对分组后产生的结果进行筛选。

```sql
SELECT department, COUNT(*) AS num_employees
FROM employees
GROUP BY department
HAVING COUNT(*) > 10;
```

21. 排序（升序、降序）

```sql
select age
from emp
order by age asc; # 升序排序可以省略asc

select age
from emp
order by age desc; # 降序排序

select emp.entryDate
from emp
order by entryDate desc;

# 如果是多字段排序，当第一个字段值相同时，才会根据第二个字段进行排序
select age, entryDate
from emp
order by age asc, entryDate desc;
```

`ORDER BY` 用于对查询结果进行排序，可指定按照一个或多个列进行升序 (ASC) 或降序 (DESC)。如果未指定排序方式，默认使用升序(所以ASC可以省略）。  
示例：

```sql
SELECT column1, column2
FROM your_table
ORDER BY column1 ASC, column2 DESC;
```

以上示例会先根据 `column1` 进行升序排序，然后在相同 `column1` 值范围内按 `column2` 降序排序。



22. `limit`

`LIMIT` 关键字用于限制返回结果的行数，常见于 MySQL、PostgreSQL 等数据库。它通常与 `ORDER BY` 搭配使用，指定查询要返回的记录数量以及（在某些数据库中）从哪一行开始返回。  
示例用法：

```sql
SELECT * 
FROM your_table
ORDER BY id ASC
LIMIT 10;

# example:
select *
from emp
limit 0, 10; # 从0索引开始，显示10个数据
select *
from emp
limit 10;
```

以上示例会返回第 1 行至第 10 行的记录（共 10 行）。另外，一些数据库（如 MySQL）也支持指定偏移量 (OFFSET)，可以实现从指定行开始返回后续行数的功能。例如：

```sql
SELECT * 
FROM your_table
ORDER BY id ASC
LIMIT 10 OFFSET 20;
```

这会跳过前 20 行，然后返回接下来的 10 行记录。

23. from, select和where谁先执行：

```sql
# 验证执行顺序
select e.age, e.name
from emp as e
where e.age > 20
order by age asc; # 这里起的别名不可以用'e'
select e.name, e.age
from emp e
where e.age > 15
order by age asc;
# 综合以上，from在select和where之前执行
# select age as eage, name as ename from emp where eage > 20 order by eage asc;
# 此时报错，所以where在select之前执行
# 所以得出结论：from 先执行，然后执行 where ， 再执行select，最后执行order by 。
-- 综上所述，我们可以看到DQL语句的执行顺序为： from ... where ... group by ... having ... select ... order by ... limit
```

24. 查询、创建用户

```sql
select *
from mysql.user; # 查询用户

create user 'Peter'@'localhost' identified by '111111'; # 创建用户
create user 'Peter'@'&' identified by '111111'; # 创建用户,可以在任意主机访问该数据库
alter user 'Peter'@'localhost' identified with mysql_native_password BY '222222'; # 修改密码
drop user 'Peter'@'localhost';
```

25. 权限

```sql
# 这条语句用于查看用户 'Peter'@'localhost' 拥有哪些权限。执行后会显示该用户当前被授予的权限列表。
show grants for 'Peter'@'localhost';

# 表示将数据库 test 中 emp 这个表的所有权限授予给 'Peter'@'localhost'。
# 通常情况下，ALL 能包含大部分常见的操作权限（如 SELECT、INSERT、UPDATE、DELETE、CREATE、DROP 等)
grant all on test.emp to 'Peter'@'localhost';

# 语句用于收回之前授予 'Peter'@'localhost' 在 test.emp 表上所拥有的所有权限。执行后，该用户将不再拥有对 test.emp 的操作权限。

revoke all on test.emp from 'Peter'@'localhost';
```



26. 字符串函数

```sql
select concat('Hello', 'MySQL'); # 字符串拼接
select lower('HelloMySQL'); # 转为小写
select upper('hello mysql'); #转为大写
select lpad('Hello', 10, 'lin'); # 向左填充
select rpad('Hello', 12, 'MySQL'); # 向右填充
select trim('   Hello hi '); # 去除字符串头部和尾部的空格
select substring('Hello Hi MySQL', 2, 8); # 返回字符串从start开始的len个长度的字符串

# lpad：
update emp
set workNo = lpad(workNo, 5, 0)
where length(workNo) < 5;
```

27. 数值函数

```sql
-- 数值函数
select ceil(1.1); # 向上取整
select floor(2.5); # 向下取整
select mod(4, 2);
select mod(7, 4); # 返回x/y的模
select rand(); # 返回0~1的随机数
select round(3.6 / 2, 3); # 求参数x的四舍五入的值，保留y位小数
select round(3.53, 3);
select round(2.344, 2);
select round(1.345, 2);

# example:

# 生成六位数的随机数
select round(rand() * 1000000, 0);
select lpad(round(rand() * 1000000, 0), 6, '0');
```

28. 日期函数

```sql
-- 日期函数
select curdate(); # 返回当前日期
select curtime(); # 返回当前时间
select now(); # 返回当前日期和时间
select year(now()); # 获取指点date年份
select month(now()); #  获取指定date月份
select day(now()); # 获取指定date日期
select date_add(now(), interval 2 day); # 返回一个日期/时间值加上一个时间间隔expr后的时间值
select datediff('2012-2-24', '2012-2-4'); # 返回起始时间date1和结束时间date2之间的天数

# example：
select name, datediff(now(), entryDate) as day
from emp
order by day desc;
```

29. 流程函数

```sql
-- 流程函数
select if(2, true, false); # 在这里的true是1,false是0
select if(false, true, false);

select ifnull('OK', 'Default');
select ifnull('', 'Default');
select ifnull(null, 'Default');
# 如果value1不为空，返回value1，否则返回value2
```

30. `when``then`

```sql
create table score
(
    id      int comment 'ID',
    name    varchar(20) comment '姓名',
    math    int comment '数学',
    english int comment '英语',
    chinese int comment '语文'
) comment '成绩表';

insert into score(id, name, math, english, chinese)
VALUES (1, 'Tom', 67, 88, 95),
       (2, 'Rose', 23, 66, 90),
       (3, 'Jack', 56, 98, 76);

select id,
       name,
       (case when math >= 85 then '优秀' when math >= 60 then '及格' else '不及格' end)
           as '数学',
       (case
            when english >= 85 then '优秀'
            when english >= 60 then '及格'
            else '不及格'
           end)
           as '英语',
       (case
            when chinese >= 85 then '优秀'
            when chinese >= 60 then '及格'
            else '不及格'
           end)
           as '语文'
from score;
```

31. 约束

```sql
-- 约束

CREATE TABLE tb_user
(
    id     int AUTO_INCREMENT PRIMARY KEY COMMENT 'ID唯一标识',
    name   varchar(10) NOT NULL UNIQUE COMMENT '姓名',
    age    int check (age > 0 && age <= 120) COMMENT '年龄',
    status char(1) default '1' COMMENT '状态',
    gender char(1) COMMENT '性别'
);
```

32. 外键

```sql
# 为emp表的dept_id字段添加外键约束（外键名称自取）,关联dept表的主键id
alter table emp
    add constraint fk_emp_dept_id foreign key (dept_id) references dept (id);

    # 删除外键
alter table emp
    drop foreign key fk_emp_dept_id;
```

33. `cascade`

```sql
# 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有，则也删除/更新外键在子表中的记录。
alter table emp
    add constraint fk_emp_dept_id2 foreign key (dept_id) references dept (id)
        on update cascade on delete cascade;
```

34. ser null

```sql
# 当在父表中删除对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键值为null（这就要求该外键允许取null）。
alter table emp
    add constraint fk_emp_dept_id3 foreign key (dept_id) references dept (id)
        on update set null on delete set null;
```

35. 多表关系

```sql
create table student
(
    id   int auto_increment primary key comment '主键ID',
    name varchar(10) comment '姓名',
    no   varchar(10) comment '学号'
) comment '学生表';
insert into student
values (null, '黛绮丝', '2000100101'),
       (null, '谢逊',
        '2000100102'),
       (null, '殷天正', '2000100103'),
       (null, '韦一笑', '2000100104');
create table course
(
    id   int auto_increment primary key comment '主键ID',
    name varchar(10) comment '课程名称'
) comment '课程表';
insert into course
values (null, 'Java'),
       (null, 'PHP'),
       (null, 'MySQL'),
       (null, 'Hadoop');
create table student_course
(
    id        int auto_increment comment '主键' primary key,
    studentid int not null comment '学生ID',
    courseid  int not null comment '课程ID',
    constraint fk_courseid foreign key (courseid) references course (id),
    constraint fk_studentid foreign key (studentid) references student (id)
) comment '学生课程中间表';
insert into student_course
values (null, 1, 1),
       (null, 1, 2),
       (null, 1, 3),
       (null, 2, 2),
       (null, 2, 3),
       (null, 3, 4);

# 一对一
create table tb_user
(
    id     int auto_increment primary key comment '主键ID',
    name   varchar(10) comment '姓名',
    age    int comment '年龄',
    gender char(1) comment '1: 男 , 2: 女',
    phone  char(11) comment '手机号'
) comment '用户基本信息表';

create table tb_user_edu
(
    id            int auto_increment primary key comment '主键ID',
    degree        varchar(20) comment '学历',
    major         varchar(50) comment '专业',
    primaryschool varchar(50) comment '小学',
    middleschool  varchar(50) comment '中学',
    university    varchar(50) comment '大学',
    userid        int unique comment '用户ID',
    constraint fk_userid foreign key (userid) references tb_user (id)
) comment '用户教育信息表';

insert into tb_user(id, name, age, gender, phone)
values (null, '黄渤', 45, '1', '18800001111'),
       (null, '冰冰', 35, '2', '18800002222'),
       (null, '码云', 55, '1', '18800008888'),
       (null, '李彦宏', 50, '1', '18800009999');
insert into tb_user_edu(id, degree, major, primaryschool, middleschool,
                        university, userid)
values (null, '本科', '舞蹈', '静安区第一小学', '静安区第一中学', '北京舞蹈学院', 1),
       (null, '硕士', '表演', '朝阳区第一小学', '朝阳区第一中学', '北京电影学院', 2),
       (null, '本科', '英语', '杭州市第一小学', '杭州市第一中学', '杭州师范大学', 3),
       (null, '本科', '应用数学', '阳泉第一小学', '阳泉区第一中学', '清华大学', 4);


```

36. 连接

```sql
-- 创建dept表，并插入数据
create table dept
(
    id   int auto_increment comment 'ID' primary key,
    name varchar(50) not null comment '部门名称'
) comment '部门表';
INSERT INTO dept (id, name)
VALUES (1, '研发部'),
       (2, '市场部'),
       (3, '财务部'),
       (4,
        '销售部'),
       (5, '总经办'),
       (6, '人事部');
-- 创建emp表，并插入数据
create table emp
(
    id        int auto_increment comment 'ID' primary key,
    name      varchar(50) not null comment '姓名',
    age       int comment '年龄',
    job       varchar(20) comment '职位',
    salary    int comment '薪资',
    entrydate date comment '入职时间',
    managerid int comment '直属领导ID',
    dept_id   int comment '部门ID'
) comment '员工表';
-- 添加外键
alter table emp
    add constraint fk_emp_dept_id foreign key (dept_id) references
        dept (id);
INSERT INTO emp (id, name, age, job, salary, entrydate, managerid, dept_id)
VALUES (1, '金庸', 66, '总裁', 20000, '2000-01-01', null, 5),
       (2, '张无忌', 20, '项目经理', 12500, '2005-12-05', 1, 1),
       (3, '杨逍', 33, '开发', 8400, '2000-11-03', 2, 1),
       (4, '韦一笑', 48, '开发', 11000, '2002-02-05', 2, 1),
       (5, '常遇春', 43, '开发', 10500, '2004-09-07', 3, 1),
       (6, '小昭', 19, '程序员鼓励师', 6600, '2004-10-12', 2, 1),
       (7, '灭绝', 60, '财务总监', 8500, '2002-09-12', 1, 3),
       (8, '周芷若', 19, '会计', 48000, '2006-06-02', 7, 3),
       (9, '丁敏君', 23, '出纳', 5250, '2009-05-13', 7, 3),
       (10, '赵敏', 20, '市场部总监', 12500, '2004-10-12', 1, 2),
       (11, '鹿杖客', 56, '职员', 3750, '2006-10-03', 10, 2),
       (12, '鹤笔翁', 19, '职员', 3750, '2007-05-09', 10, 2),
       (13, '方东白', 19, '职员', 5500, '2009-02-12', 10, 2),
       (14, '张三丰', 88, '销售总监', 14000, '2004-10-12', 1, 4),
       (15, '俞莲舟', 38, '销售', 4600, '2004-10-12', 14, 4),
       (16, '宋远桥', 40, '销售', 4600, '2004-10-12', 14, 4),
       (17, '陈友谅', 42, null, 2000, '2011-10-12', 1, null);




SHOW VARIABLES LIKE 'datadir';

-- 隐式内连接
select emp.name, dept.name from emp , dept where emp.dept_id = dept.id ;
-- 为每一张表起别名,简化SQL编写
select e.name, d.name from emp e , dept d where e.dept_id = d.id;
select * from emp, dept where emp.dept_id = dept.id;

-- 显式内连接
select e.name, d.name from emp e inner join dept d  on e.dept_id = d.id;
select e.name, d.name from emp e join dept d  on e.dept_id = d.id; # inner可以省略



-- 外连接
# 左外连接相当于查询表1(左表)的所有数据，当然也包含表1和表2交集部分的数据。
select e.*, d.name from emp e left outer join dept d on e.dept_id = d.id;
select e.*, d.name from emp e left join dept d on e.dept_id = d.id;  # outer可以省略

# 右外连接相当于查询表2(右表)的所有数据，当然也包含表1和表2交集部分的数据。
select d.*, e.* from emp e right outer join dept d on e.dept_id = d.id;
select d.*, e.* from dept d left outer join emp e on e.dept_id = d.id;


-- 自连接
select a.name , b.name from emp a , emp b where a.managerid = b.id;

select a.name '员工', b.name '领导' from emp a left join emp b on a.managerid = b.id;




-- 联合查询
select * from emp where salary < 5000
union all
select * from emp where age > 50;

# union all查询出来的结果，仅仅进行简单的合并，并未去重

select * from emp where salary < 5000
union
select * from emp where age > 50;
```

