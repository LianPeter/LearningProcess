import java.io.File;
public class Filepractice {
    public static void main(String[] args) {
        File f1 = new File("D:\\File");
        System.out.println("f1.canExecute() = "+f1.canExecute());
        File[] files=f1.listFiles();
        for(File file:files){
            if(file.isFile()){
                String s=file.getName();
                if(s.endsWith(".jpg")){
                    System.out.println(s);
                }
            }
        }
    }
}
