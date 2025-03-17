import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class UDFserver {
    public static void main(String[] args) throws IOException {
        //1.创建Serversocket对象;
        ServerSocket serverSocket = new ServerSocket(6666);
        while (true) {

            //2.调用accept方法等待客户端的连接;
            Socket socket = serverSocket.accept();

            new Thread(new Runnable() {
                @Override
                public void run() {
                    InputStream is = null;
                    FileOutputStream fos = null;
                    OutputStream os = null;
                    try {
                        //3.调用getInputStream方法将客户端的信息读进来;
                        is = socket.getInputStream();
                        //4.用FileOutputStream将读到的信息写到硬盘上;
                        fos = new FileOutputStream("C:\\Users\\asus\\Pictures\\Screenshots\\copy.png");
                        byte[] bytes = new byte[1024];
                        int len;
                        while ((len = is.read(bytes)) != -1) {
                            fos.write(bytes, 0, len);
                        }
                        //5.调用getOutPutStream方法给服务器响应结果;
                        os = socket.getOutputStream();
                        os.write("上传成功".getBytes());
                    }catch (IOException e){
                        e.getStackTrace();
                    }finally {
                        //6.关流
                        if(os!=null) {
                            try {
                                os.close();
                            } catch (IOException e) {
                                throw new RuntimeException(e);
                            }
                        }
                        if(fos!=null) {
                            try {
                                fos.close();
                            } catch (IOException e) {
                                throw new RuntimeException(e);
                            }
                        }
                        if(is!=null) {
                            try {
                                is.close();
                            } catch (IOException e) {
                                throw new RuntimeException(e);
                            }
                        }
                        if(socket!=null) {
                            try {
                                socket.close();
                            } catch (IOException e) {
                                throw new RuntimeException(e);
                            }
                        }
                    }
                }
            }).start();
        }
    }
}
