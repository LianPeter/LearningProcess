package zm.servlet;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

public class UserSevlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //从request对象中获取请求中的任何信息(username参数)
        String username = req.getParameter("username");
        //处理业务的代码
        String info="YES";

        if("atguigu".equals(username)){
            info="NO";
        }
        //接受响应的数据放入response
        PrintWriter writer =resp.getWriter();
        writer.write(info);
    }
}
