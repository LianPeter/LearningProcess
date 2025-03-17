import java.io.*;

public class Filereade {
    public static void main(String[] args)throws IOException {
        File dir = new File("D:\\a.txt");
        try {
            System.out.println("createNewFile="+dir.createNewFile());
        }catch (IOException e){
            e.getMessage();
        }
        BufferedReader br=new BufferedReader(new FileReader(dir));
        String s;
        while((s=br.readLine())!=null){
            System.out.println(s);
        }
        br.close();
    }
}
