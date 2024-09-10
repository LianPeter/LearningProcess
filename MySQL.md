# `group by`的注意事项

```sql
sql报错如下：
	[42000][1055] Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'test. emp. name' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
```

使用如下语句建表：

```sql
create table emp
(
    id          int comment '编号',
    workNo      varchar(10) comment '工号',
    name        varchar(10) comment '姓名',
    gender      char(1) comment '性别',
    age         tinyint unsigned comment '年龄',
    idCard      char(18) comment '身份证号',
    workAddress varchar(50) comment '工作地址',
    entryDate   date comment '入职时间'
) comment '员工表';

INSERT INTO emp (id, workNo, name, gender, age, idCard, workAddress, entryDate)
VALUES (1, '00001', '柳岩666', '女', 20, '123456789012345678', '北京', '2000-01-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (2, '00002', '张无忌', '男', 18, '123456789012345670', '北京', '2005-09-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (3, '00003', '韦一笑', '男', 38, '123456789712345670', '上海', '2005-08-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (4, '00004', '赵敏', '女', 18, '123456757123845670', '北京', '2009-12-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (5, '00005', '小昭', '女', 16, '123456769012345678', '上海', '2007-07-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (6, '00006', '杨逍', '男', 28, '12345678931234567X', '北京', '2006-01-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (7, '00007', '范瑶', '男', 40, '123456789212345670', '北京', '2005-05-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (8, '00008', '黛绮丝', '女', 38, '123456157123645670', '天津', '2015-05-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (9, '00009', '范凉凉', '女', 45, '123156789012345678', '北京', '2010-04-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (10, '00010', '陈友谅', '男', 53, '123456789012345670', '上海', '2011-01-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (11, '00011', '张士诚', '男', 55, '123567897123465670', '江苏', '2015-05-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (12, '00012', '常遇春', '男', 32, '123446757152345670', '北京', '2004-02-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (13, '00013', '张三丰', '男', 88, '123656789012345678', '江苏', '2020-11-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (14, '00014', '灭绝', '女', 65, '123456719012345670', '西安', '2019-05-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (15, '00015', '胡青牛', '男', 70, '12345674971234567X', '西安', '2018-04-01');
INSERT INTO emp (id, workno, name, gender, age, idcard, workAddress, entrydate)
VALUES (16, '00016', '周芷若', '女', 18, null, '北京', '2012-06-01');

```

查询语句如下：

```sql
select name, age, workAddress, count(*) as 'num' from emp where age < 45 group by workAddress having num >= 3;
```

原因分析：

> 这是一个经典的SQL错误，当使用`GROUP BY`时，如果`sql_mode`设置了`ONLY_FULL_GROUP_BY`，所有在`SELECT`列表中的列必须要么是`GROUP BY`子句中的一部分，要么是聚合函数的参数。你的SQL语句中，`name`和`age`列不符合这个规则，因为它们既不是聚合函数的参数，也不是`GROUP BY`子句中的一部分。



> 你的 SQL 语句报红但仍然可以运行，通常是因为 SQL 的某些实现允许在 `HAVING` 子句中使用别名，但标准 SQL 和一些 SQL 编辑器可能不支持这种用法。下面是详细的解释：
>
> ### SQL 语句分析：
> ```sql
> SELECT workAddress, COUNT(*) AS 'num'
> FROM emp
> WHERE age < 45
> GROUP BY workAddress
> HAVING num >= 3;
> ```
>
> ### 1. **别名的使用**：
> - 在你的查询中，你为 `COUNT(*)` 指定了别名 `'num'`。
> - ==然而，标准 SQL 规定 `HAVING` 子句中的条件无法直接使用 `SELECT` 子句中定义的别名，因为 `HAVING` 子句是在 `GROUP BY` 之后处理的，这时候 `SELECT` 子句中的别名还没有被解析。==
> - > [!CAUTION]
>   >
>   > 让我们深入解释为什么标准 SQL 规定 `HAVING` 子句中的条件无法直接使用 `SELECT` 子句中定义的别名，以及为什么你的 SQL 语句可能会报红但仍然可以运行。
>   >
>   > ### SQL 语句的执行顺序
>   >
>   > 为了理解这个问题，我们需要先了解 SQL 语句的执行顺序。标准 SQL 查询的处理步骤如下：
>   >
>   > 1. **FROM** 子句：选择并连接数据源。
>   > 2. **WHERE** 子句：过滤行。
>   > 3. **GROUP BY** 子句：对行进行分组。
>   > 4. **HAVING** 子句：对分组进行过滤。
>   > 5. **SELECT** 子句：选择列和计算表达式。
>   > 6. **ORDER BY** 子句：排序结果。
>   > 7. **LIMIT** 子句：限制返回的行数。
>   >
>   > ### 为什么标准 SQL 不允许在 HAVING 子句中使用 SELECT 子句的别名
>   >
>   > 按照上面的执行顺序，`HAVING` 子句是在 `GROUP BY` 子句之后执行的，而 `SELECT` 子句是在 `HAVING` 之后执行的。这意味着在标准 SQL 中，`SELECT` 子句中的别名在 `HAVING` 子句执行时还没有被解析。
>   >
>   > ### 示例解释
>   >
>   > 考虑以下 SQL 语句：
>   >
>   > ```sql
>   > SELECT workAddress, COUNT(*) AS num
>   > FROM emp
>   > WHERE age < 45
>   > GROUP BY workAddress
>   > HAVING num >= 3;
>   > ```
>   >
>   > 在这条语句中，`COUNT(*)` 的结果被赋值为别名 `num`，然后 `HAVING` 子句试图使用这个别名 `num` 进行过滤。但根据 SQL 的执行顺序，`HAVING` 子句无法直接使用 `SELECT` 子句中定义的别名，因为此时别名 `num` 尚未被定义。
>   >
>   > ### 解决方案
>   >
>   > 为了确保 SQL 语句的兼容性，推荐在 `HAVING` 子句中直接使用聚合函数，而不是别名。例如：
>   >
>   > ```sql
>   > SELECT workAddress, COUNT(*) AS num
>   > FROM emp
>   > WHERE age < 45
>   > GROUP BY workAddress
>   > HAVING COUNT(*) >= 3;
>   > ```
>   >
>   > ### 为什么某些数据库系统允许在 HAVING 中使用别名
>   >
>   > 一些数据库系统（如 MySQL）为了方便用户，会允许在 `HAVING` 子句中使用 `SELECT` 子句中定义的别名。这是因为这些系统在内部处理 SQL 语句时进行了扩展，使其能够识别并使用别名。但这种特性并不符合所有 SQL 标准，因此在某些 SQL 编辑器或其他数据库系统中可能会报错或不兼容。
>   >
>   > ### 实际开发中的建议
>   >
>   > 为了确保 SQL 语句在不同的数据库系统中都能正确运行，并提高代码的可读性和可维护性，建议在 `HAVING` 子句中直接使用原始的聚合函数，而不是别名。这不仅可以避免潜在的兼容性问题，还能使代码更加清晰明了。
>   >
>   > 总结如下：
>   >
>   > 1. **标准 SQL 执行顺序**：`HAVING` 子句在 `SELECT` 子句之前执行，因此无法使用 `SELECT` 子句中的别名。
>   > 2. **某些数据库系统的扩展**：一些数据库系统允许在 `HAVING` 中使用别名，但这不是标准行为。
>   > 3. **推荐做法**：在 `HAVING` 子句中直接使用聚合函数或表达式，而不是别名，以确保兼容性和可读性。
>
>   
>
> ### 2. **SQL 实现的灵活性**：
> - 一些数据库系统（如 MySQL）允许在 `HAVING` 子句中使用 `SELECT` 子句定义的别名。这是因为这些系统在内部解析 SQL 语句时，对 `HAVING` 子句进行了扩展，使它能够识别别名。
> - 这种特性并不符合所有 SQL 标准，但在某些数据库系统中，它是被支持的。
>
> ### 3. **标准 SQL 写法**：
> - 为了确保 SQL 语句的兼容性和可移植性，建议在 `HAVING` 子句中使用原始表达式，而不是别名。这样可以避免在不同数据库系统或 SQL 编辑器中出现兼容性问题。
>
> ### 4. **修正 SQL 语句**：
> - 你可以使用原始的聚合表达式而不是别名来避免问题。例如：
>   ```sql
>   SELECT workAddress, COUNT(*) AS 'num'
>   FROM emp
>   WHERE age < 45
>   GROUP BY workAddress
>   HAVING COUNT(*) >= 3;
>   ```
>
> ### 总结：
> - **报红但能运行**：这是因为某些数据库系统在解析 SQL 时可能允许在 `HAVING` 子句中使用 `SELECT` 子句的别名，但这不是标准 SQL 行为。
> - **推荐做法**：为了提高 SQL 语句的兼容性和可维护性，建议在 `HAVING` 子句中直接使用聚合函数或原始表达式，而不是别名。这样可以避免潜在的兼容性问题。

# 起别名注意事项

```sql
select e.age, e.name from emp as e where e.age > 20 order by age asc; 
# 这里起的别名不可以用'e'
```

'e'是字符，不能用e点的形式调用

# 函数

##  字符串函数

```sql
-- 字符串函数
select concat('Hello', 'MySQL'); # 字符串拼接
select lower('HelloMySQL'); # 转为小写
select upper('hello mysql'); #转为大写
select lpad('Hello', 10, 'lin'); # 向左填充
select rpad('Hello', 12, 'MySQL');  # 向右填充
select trim('   Hello hi ');  # 去除字符串头部和尾部的空格
select substring('Hello Hi MySQL', 2, 8); # 返回字符串从start开始的len个长度的字符串
```

>  `substring(str, start, len)`中的start不是从0开始，而是从第一个开始，即，字符串第一个字符的start就是1

## 数值函数

```sql
-- 数值函数
select ceil(1.1); # 向上取整
select floor(2.5);  # 向下取整
select mod(4, 2);
select mod(7, 4);  # 返回x/y的模
select rand();  # 返回0~1的随机数
select round(3.6 / 2, 3);  # 求参数x的四舍五入的值，保留y位小数
select round(3.53, 3);
```

> 在`round(x, y)`中，求参数x的四舍五入值，保留y位小数。x如果是表达式，y是保留的小数位数。如果x不是表达式，那么结果就是x的值（要四舍五入），并保留y位小数

## 日期函数

```sql
-- 日期函数
select curdate();  # 返回当前日期
select curtime(); # 返回当前时间
select now();  # 返回当前日期和时间
select year(now());  # 获取指点date年份
select month(now());  #  获取指定date月份
select day(now());  # 获取指定date日期
select date_add(now(), interval 2 day);  # 返回一个日期/时间值加上一个时间间隔expr后的时间值
select datediff('2012-2-24', '2012-2-4'); # 返回起始时间date1和结束时间date2之间的天数
```

> 如果传入的是指定日期如：`2020-1-1`，需要加上引号，否则 (在datediff()) 返回null

## 流程函数

| 函数                                                       | 功能                                                         |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| IF(value, t, f)                                            | 如果value为true，则返回t，否则返回f                          |
| IFNULL(value1, value2)                                     | 如果value不为空，返回value1， 否则返回value2                 |
| CASE WHEN [vall] THEN [res1] ... ELSE [default] END        | 入伏哦vall为true，返回res1，... ，否则返回default默认值      |
| CASE [expr] WHEN [vall] THEN [res1] ... ELSE [default] END | 入伏哦expr的值等于vall，返回res1，... , 否则返回default默认值 |

```sql
select if(2, true, false); # 在这里的true是1,false是0
select if(false, true, false);
```

>  执行以上两条sql语句，发现返回的反别是1和0， 这说明true为1， false为0；

```sql
-- 流程函数
select if(2, true, false); # 在这里的true是1,false是0
select if(false, true, false);

select ifnull('OK', 'Default');
select ifnull('', 'Default');
select ifnull(null, 'Default');  # 如果value1不为空，返回value1，否则返回value2

select name, (case emp.workAddress when '北京' then '一线城市' when '上海' then '一线城市' else '二线城市' end) as '工作地址'
from emp;


create table score(
    id int comment 'ID',
    name varchar(20) comment '姓名',
    math int comment '数学',
    english int comment '英语',
    chinese int comment '语文'
)comment '成绩表';

insert into score(id, name, math, english, chinese)
VALUES (1, 'Tom', 67, 88, 95 ),
       (2, 'Rose' , 23, 66, 90),
       (3, 'Jack', 56, 98, 76);

select
    id,
    name,
    (case when math >= 85 then '优秀' when math >=60 then '及格' else '不及格' end )
as '数学',
    (case when english >= 85 then '优秀' when english >=60 then '及格' else '不及格'
end )
as '英语',
    (case when chinese >= 85 then '优秀' when chinese >=60 then '及格' else '不及格'
end )
as '语文'
from score;
```

## 总结

> MySQL的常见函数我们学习完了，那接下来，我们就来分析一下，在前面讲到的两个函数的案例场景，
> 思考一下需要用到什么样的函数来实现?

1. 数据库中，存储的是入职日期，如 2000-01-01，如何快速计算出入职天数呢？ --------> 
   答案: datediff

2. 数据库中，存储的是学生的分数值，如98、75，如何快速判定分数的等级呢？ ----------> 
   答案: case ... when ...
