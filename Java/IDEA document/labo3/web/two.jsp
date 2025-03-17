<%--
  Created by IntelliJ IDEA.
  User: 93514
  Date: 2025/3/6
  Time: 20:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>第二个页面</title>
</head>
<body>
    <%
        // 设置请求数据中文乱码解决方式
        request.setCharacterEncoding("utf-8");

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        boolean sex = Boolean.parseBoolean(request.getParameter("sex"));
        double score = Double.parseDouble(request.getParameter("score"));
        int address = Integer.parseInt(request.getParameter("address"));

        // 多个兴趣爱好，使用字符串数组获取
        String[]hobbies = request.getParameterValues("hobbies");
        String description = request.getParameter("description");

        // 输出获取的表单元素值

        out.print("用户名："+username+"<br/>");
        out.print("密码："+password+"<br/>");
        out.print("性别："+sex+"<br/>");
        out.print("成绩："+score+"<br/>");
        out.print("出生地："+address+"<br/>");

        // 输出多个兴趣爱好
        out.print("兴趣爱好：");
        for (String s:hobbies) {
            out.print(s+";");
        }

        out.print("<br/>个人简介："+description+"<br/>");

        out.print(request.getParameter("headimage"));

        // 判断用户名密码是否正确，做出不同的响应
        if(username.equals("admin") && password.equals("123456")) {
            response.sendRedirect("three.jsp");
        } else {
            response.sendRedirect("one.jsp");
        }

    %>
</body>
</html>
