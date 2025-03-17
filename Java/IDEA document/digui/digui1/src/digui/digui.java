package digui;

import java.util.Arrays;

public class digui {
    public static int method(int n){
        int x=0;
        if(n==1||n==2) {
            return 1;
        }
             return method(n-1)+method(n-2);
    }
    public  static  void  main(String[] args){
        System.out.println(method(6));
    }
}
