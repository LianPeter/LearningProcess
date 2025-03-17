<%--
  Created by IntelliJ IDEA.
  User: 93514
  Date: 2025/3/6
  Time: 19:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>第1个页面</title>
</head>
<body>
    <form method="post" action="two.jsp">
        <table>
            <tr>
                <td>用户名:</td>
                <td><input type="text" name="username" /></td>
            </tr>
            <tr>
                <td>密码:</td>
                <td><input type="password" name="password" /></td>
            </tr>
            <tr>
                <td>性别:</td>
                <td>
                    <input type="radio" name="sex" checked="checked" value="true" />男
                    <input type="radio" name="sex" value="false" />女
                </td>
            </tr>
            <tr>
                <td>成绩:</td>
                <td><input type="text" name="score" /></td>
            </tr>
            <tr>
                <td>出生地:</td>
                <td><select name="address">
                    <option value="0">请选择...</option>
                    <option value="1">桂林</option>
                    <option value="2">南宁</option>
                    <option value="3">深圳</option>
                </select></td>
            </tr>
            <tr>
                <td>兴趣爱好:</td>
                <td>
                    <input type="checkbox" name="hobbies" value="游泳" />游泳<br/>
                    <input type="checkbox" name="hobbies" value="爬山" />爬山<br/>
                    <input type="checkbox" name="hobbies" value="看电影" />看电影<br/>
                    <input type="checkbox" name="hobbies" value="打游戏" />打游戏<br/>
                </td>
            </tr>

            <tr>
                <td>个人简介:</td>
                <td><textarea name="description" rows="10" cols="40"></textarea></td>
            </tr>
            <tr>
                <td>头像:</td>
                <td><input type="file" name="headimage" /></td>
            </tr>
            <tr>
                <td colspan="2" align="center"><input type="submit" value="提交" /></td>
            </tr>
        </table>
    </form>
</body>
</html>
