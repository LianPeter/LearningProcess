import java.util.function.Predicate;

public class predicate {
    public static void main(String[] args) {
        method(s->s.length()==8,"abcdefg");
    }
    public static void method(Predicate<String> predicate,String s){
        boolean f=predicate.test(s);
        System.out.println(f);
    }
}
