package com.atguigu;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

public class  UserSevlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1 从req对象中获取请求的任何信息(username参数)
        String username = req.getParameter("username");
        //2 处理业务的代码

        String info="YES";
        if("atguigu".equals(username)) {
            info="NO";
        }

        //3 将要响应的数据放入res
        PrintWriter writer=resp.getWriter();//该方法返回的是一个向响应体中答应字符串的打印流
        writer.println(info);
    }
}
