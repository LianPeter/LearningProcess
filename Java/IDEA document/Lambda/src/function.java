import java.util.function.Function;

public class function {
    public static void main(String[] args) {
        method(integer-> integer+"",200);
    }
    public static void method(Function<Integer,String> function,Integer integer){
        String s=function.apply(integer);
        System.out.println("s="+(s+1));
        String[] s1=new String[3];
    }
}
