import java.io.File;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.FileInputStream;
import java.io.FileOutputStream;

public class Filecopy {
    public static void main(String[] args)throws IOException {
        System.out.println("文件复制开始:");
        File f1=new File("D:\\a.txt");
        System.out.println("f1.createNewFile()="+f1.createNewFile());
        File f2=new File("D:\\b.txt");
        System.out.println("f2.createNewFile()"+f2.createNewFile());
        BufferedInputStream bis=new BufferedInputStream(new FileInputStream(f1));
        BufferedOutputStream bos=new BufferedOutputStream(new FileOutputStream(f2));
        int count;
        int n=bis.available()/10;
        byte b[]=new byte[1024];
        while((count=bis.read(b,0,n))!=-1){
            bos.write(b,0,count);
        }
        System.out.println("文件复制完成");
        bos.flush();
        bos.close();
        bis.close();
    }
}
