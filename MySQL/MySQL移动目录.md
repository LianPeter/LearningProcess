系统信息：

> 安装路径：C:\Program Files\MySQL\MySQL Server 8.0 
>
> 操作系统：Windows11 
>
> 当前数据目录C:\ProgramData\MySQL\MySQL Server 8.0\Data\





<font color='red' size=6>操作：</font>


### 步骤 1：停止 MySQL 服务

在命令提示符中输入以下命令来停止 MySQL 服务：

```shell
net stop mysql
```

### 步骤 2：复制数据目录到新的位置

使用文件资源管理器或者命令行将当前数据目录复制到 E 盘的新位置。例如，复制到 `E:\MySQL\Data`。

#### 命令行复制：

打开命令提示符（以管理员身份运行）并执行以下命令：

```shell
xcopy /s /e /i "C:\ProgramData\MySQL\MySQL Server 8.0\Data" "E:\MySQL\Data"
```

### 步骤 3：修改 MySQL 配置文件

找到并修改 MySQL 的配置文件 `my.ini`，将数据目录路径修改为新的位置。

#### 配置文件路径：

配置文件通常位于以下路径之一：
- `C:\Program Files\MySQL\MySQL Server 8.0\my.ini`
- `C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`

打开 `my.ini` 文件，找到 `datadir` 行并将其修改为新的路径：

```ini
[mysqld]
datadir=E:/MySQL/Data
```

### 步骤 4：设置新数据目录的权限

确保 MySQL 服务有权限访问新的数据目录。你可以通过右键点击新数据目录，选择“属性”，然后在“安全”选项卡中设置合适的权限。

### 步骤 5：修改 MySQL 服务的路径（可选）

如果 MySQL 服务路径中包含数据目录路径，可能需要更新它。通常不需要修改，但为了确保万无一失，可以检查并修改。

#### 通过命令行修改：

在命令提示符中执行以下命令：

```shell
sc config MySQL80 binPath= "\"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld\" --defaults-file=\"C:\ProgramData\MySQL\MySQL Server 8.0\my.ini\""
```

### 步骤 6：启动 MySQL 服务

启动 MySQL 服务：

```shell
net start mysql
```

### 步骤 7：验证配置

启动 MySQL 服务后，使用 MySQL 客户端连接数据库，执行一些查询以确保数据目录迁移成功。

#### 连接到 MySQL：

```shell
mysql -u root -p
```

#### 执行一些查询来验证数据是否正常：

```sql
SHOW DATABASES;
SELECT * FROM some_table;
```

### 总结

通过以上步骤，你应该可以成功将 MySQL 数据目录迁移到 E 盘。如果在任何步骤中遇到问题，请检查 MySQL 错误日志（通常位于 MySQL 安装目录下的 `data` 目录中，文件名为 `hostname.err`），以获取详细的错误信息并进行排查。如果有任何问题，请随时告诉我。
