import java.io.*;
import java.net.Socket;

public class UDFclient {
    public static void main(String[] args)throws IOException {
        //1.创建Socket对象;
        Socket socket=new Socket("127.0.0.1",6666);
        //2.创建FileInputStream用于读取本地文件;
        FileInputStream fs=new FileInputStream("C:\\Users\\asus\\Pictures\\Screenshots\\屏幕截图 2024-06-18 163102.png");
        //3.调用getOutputStream方法将读到的文件传到服务器端当中;
        OutputStream os=socket.getOutputStream();
        //4.边读边写
        byte[] bytes=new byte[1024];
        int count;
        while((count=fs.read(bytes))!=-1){
            os.write(bytes,0,count);
        }
        //5.给服务端添加一个结束响应;
        socket.shutdownOutput();
        System.out.println("==========以下是代码读取响应的结果=============");
        //6.调用getInPutStream方法读取服务器响应的信息;
        InputStream fis=socket.getInputStream();
        byte[] bytes1=new byte[1024];
        int len=fis.read(bytes1);
        System.out.println(new String(bytes1,0,len));
        //7.关流
        fis.close();
        os.close();
        fs.close();
        socket.close();
        }
    }

