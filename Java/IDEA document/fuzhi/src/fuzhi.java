import java.io.*;
public class fuzhi {
    public static void main(String[] args)throws Exception {
                int size;
                    FileInputStream fin = new FileInputStream("C:\\source.txt");
                    FileOutputStream fout = new FileOutputStream("D:\\dest.txt");
                    size = fin.available();
                    int n = size / 10;
                    byte b[] = new byte[n];
                    int count = 0;
                    while ((count = fin.read(b, 0, n)) != -1) {
                        fout.write(b, 0, count);
                    }
                    fin.close();
                    fout.flush();
                    fout.close();
            }
        }
