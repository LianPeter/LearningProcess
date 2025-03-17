import java.io.*;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;
import  java.util.logging.FileHandler;
public class fuzhi1 {
    public static void main (String[] args)throws  Exception {
        Logger logger =Logger.getLogger("code0701.NoExceptionModified");
        FileHandler fh=new FileHandler("log.log",1000,2,true);
        fh.setFormatter(new SimpleFormatter());
        logger.addHandler(fh);
        try{
        File file=new File("C:\\source.txt");
        FileInputStream fin =new FileInputStream(file);
        FileOutputStream fout = new FileOutputStream("D:\\dest.txt");
        InputStreamReader isr =new InputStreamReader(fin,"UTF-8");
        OutputStreamWriter osw =new OutputStreamWriter(fout,"UTF-8");
        int n=(int)(file.length()/10);
        char b[]=new char[n];
        int count=0;
        while((count=isr.read(b,0,n))!=-1) {
            osw.write(b, 0, count);
            isr.close();
            fin.close();
            fout.flush();
            osw.flush();
            fout.close();
            osw.close();
        }
        }catch (FileNotFoundException e){
            logger.warning("文件未找到");
        }catch (IOException e){
            logger.warning("输入输出格式有误");
        }finally {
        }
    }
}
