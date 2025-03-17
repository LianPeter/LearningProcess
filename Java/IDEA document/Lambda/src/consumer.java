import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.function.Consumer;

public class consumer {
    public static void main(String[] args) throws Exception{
        Class<function>  aclass= function.class;
        Method[] method=aclass.getMethods();
        for(Method method1: method){
            System.out.println(method1);
        }
    }
}
