import  java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.stream.Stream;

public class stream {
    public static void main(String[] args) {
        ArrayList<String> list=new ArrayList<>();
        list.add("张无忌");
        list.add("张三丰");
        list.add("张大彪");
        list.add("吕不韦");
        list.add("张三");
        list.add("赵姬");
        list.add("张翠山");
        list.add("嫪毐");
        Stream<String> stream=list.stream();
        stream.filter(s ->s.startsWith("张")).filter(s->s.length()==3).forEach(s->System.out.println(s));
    }
}
