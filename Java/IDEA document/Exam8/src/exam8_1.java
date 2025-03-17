import java.io.*;

public class exam8_1 {
    public static void main(String[] args)throws Exception {
        File f1=new File("D:\\number1.txt");
        File f2=new File("D:\\number2.txt");
        try {
            System.out.println("f1.createNewFile=" + f1.createNewFile());
            System.out.println("f2.createNewFile=" + f2.createNewFile());
        }catch(IOException e){
            e.getStackTrace();
        }
        BufferedInputStream br=null;
        BufferedOutputStream bos=null;
        try {
             br = new BufferedInputStream(new FileInputStream(f1));
             bos=new BufferedOutputStream(new FileOutputStream(f2));
        }catch (IOException e){
            e.getStackTrace();
        }finally {
            if(br==null){
                try {
                    br.close();
                    bos.close();
                }catch(IOException e){
                    e.getStackTrace();
                }
            }
        }
        int data;
        byte bt[]=new byte[1024];
        while((data=br.read(bt))!=-1){
            for(int i=0;i<data;i++){
                bt[i]=(byte)(bt[i]+1);
            }
            bos.write(bt,0,data);
        }
        bos.flush();
        bos.close();
        br.close();
        BufferedInputStream brs=null;
        try{
            brs=new BufferedInputStream(new FileInputStream(f2));
        }catch (IOException e){
            e.getStackTrace();
        }finally {
            if(brs==null){
                brs.close();
            }
        }
        int dataread;
        while((dataread=brs.read())!=-1){
            System.out.print((char)dataread);
        }
        brs.close();
    }
}
