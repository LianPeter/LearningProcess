import java.util.Scanner;

public class DemoString {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        StringBuilder sb=new StringBuilder();
        for (int i = 0; i <5 ; i++) {
            String data=sc.next();
            if(i<4) {
                sb.append(data+",");
            }else{
                sb.append(data);
            }
        }
        sb.reverse();
        System.out.println("["+sb+"]");
    }
}
