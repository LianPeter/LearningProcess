package random;
import  java.util.Random;
import  java.util.Scanner;
public class random {
    public static void main(String[] args){
        Random ra=new Random();
        Scanner sc=new Scanner(System.in);
        int a=ra.nextInt(100)+1;
        System.out.println(" 请输入要猜的数字:");
        while (true){
            int x=sc.nextInt();
            if(x==a){
                System.out.println(" 恭喜你猜对了" );
                break;
            } else if (x>a) {
                System.out.println(" 猜大了" );
                continue;
            } else if (x<a) {
                System.out.println(" 猜小了" );
                continue;
            }
        }
    }
}
