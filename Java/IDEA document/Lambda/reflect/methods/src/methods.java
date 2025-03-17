import java.util.function.Function;

public class methods {
    public static void main(String[] args) {
        method(integer->new int[integer],10);
        /*
         * 引用方法的返回值和参数要跟重写方法的相同且要在重写方法的里面,就可以省略成
         * 重写方法的参数干掉,被引用方法的参数干掉,将被引用方法的.改成::;
         * 就可以达成引用方法的省略;
         */
        method(int[]::new,10);
    }
    public static void method(Function<Integer,int[]> function,Integer len){
        int[] arr=function.apply(len);
        System.out.println(len);
    }
}
