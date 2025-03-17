import java.util.Arrays;
import java.util.function.Supplier;

public class supplier {
    public static void main(String[] args) {
        Integer[] a={3,4,5,6,4,7};
        method(()-> {
                Arrays.sort(a);
                return a[a.length-1];
        });
    }
    public static void method(Supplier<Integer> supplier){
        Integer max=supplier.get();
        System.out.println("数组最大值为:"+max);
    }
}
