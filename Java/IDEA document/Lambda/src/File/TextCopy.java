package File;

import java.io.*;
import java.util.Arrays;

public class TextCopy {
    public static void main(String[] args) {
        File dir=new File("a.txt");
        File text=new File("b.txt");
        BufferedReader br=null;
        BufferedWriter bw=null;
        System.out.println("开始复制.....");
        try {
            br = new BufferedReader(new FileReader(dir));
            bw=new BufferedWriter(new FileWriter(text));
            String s;
            while((s=br.readLine())!=null){
                bw.write(s);
                bw.newLine();
            }
        }catch (IOException e){
            System.out.println(e);
        }finally {
            if(br!=null){
                try{
                    br.close();
                }catch (IOException e){
                    e.getStackTrace();
                }
            }
            if(bw!=null){
                try {
                    bw.close();
                }catch (IOException e){
                    e.getStackTrace();
                }
            }
        }
        System.out.println("复制成功.......");
    }
}
