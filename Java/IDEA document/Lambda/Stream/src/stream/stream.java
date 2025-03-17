package stream;

import java.util.ArrayList;
import java.util.function.Predicate;
import java.util.stream.Stream;

public class stream {
    public static void main(String[] args) {
        ArrayList<String> arrayList1=new ArrayList<>();
        arrayList1.add("张三");
        arrayList1.add("张思");
        arrayList1.add("王五");
        arrayList1.add("123");
        arrayList1.add("111");
        arrayList1.add("666");
        arrayList1.add("777");

        ArrayList<String> arrayList2=new ArrayList<>();
        arrayList2.add("张三丰");
        arrayList2.add("李逵");
        arrayList2.add("叶凡");
        arrayList2.add("姬紫月");
        arrayList2.add("牛逼哥");
        arrayList2.add("荒天帝");
        arrayList2.add("张1");
        arrayList2.add("张0");

        Stream<String> stream1 = arrayList1.stream();
        Stream<String> stream2 = arrayList2.stream();

        //stream1.filter(s->s.length()==3).limit(3).forEach(s -> System.out.println(s));
        //stream2.filter(s->s.startsWith("张")).skip(2).forEach(s -> System.out.println(s));
        Stream.concat(stream1, stream2).forEach(s -> System.out.println(s));
    }
}
