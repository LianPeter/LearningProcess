package File;

import java.io.*;

public class VideoCopy {
    public static void main(String[] args) {
        File dir=new File("a.txt");
        File video=new File("b.txt");
        BufferedInputStream bis=null;
        BufferedOutputStream bos=null;
        System.out.println("开始复制......");
        try {
            System.out.println(dir.createNewFile());
            System.out.println(video.createNewFile());
            bis=new BufferedInputStream(new FileInputStream(dir));
            bos=new BufferedOutputStream(new FileOutputStream(video));
            byte[] bytes=new byte[1024];
            int lenth=bis.available()/10;
            int count;
            while((count=bis.read(bytes,0,lenth))!=-1){
                bos.write(bytes,0,count);
            }
        }catch (IOException e){
            e.getStackTrace();
        }finally {
            if(bis!=null){
                try {
                    bis.close();
                }catch (IOException e){
                    e.getStackTrace();
                }
            }
            if(bos!=null){
                try {
                    bos.close();
                }catch (IOException e){
                    e.getStackTrace();
                }
            }
        }
        System.out.println("复制成功....");
    }
}
