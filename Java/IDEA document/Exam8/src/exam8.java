import  java.io.*;
import java.util.Scanner;
public class exam8 {
    public static void main(String[] args)throws Exception{
        File f1=new File("D:\\number1.txt");
        System.out.println("f1.createNewFile=" + f1.createNewFile());
        //创建输入输出流文件;
        FileInputStream fin=new FileInputStream(f1);
        FileOutputStream fout=new FileOutputStream(f1);
        Scanner sc=new Scanner(System.in);
        //将数字转为字节数组输入进文件中;
        for (int i = 0; i < 10; i++) {
            int num=sc.nextInt();
            fout.write((num+" ").getBytes());
        }
        fout.flush();
        fout.close();
        int data;
        //将文件中读出的字节强转成字符输出到屏幕中;
        while((data=fin.read())!=-1){
            System.out.print((char)data);
        }
        fin.close();
        }
    }


