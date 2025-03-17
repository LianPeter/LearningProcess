import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class jihe {
    public static void main(String[] args) {
        HashMap<Integer,String> map1=new HashMap<>();
        map1.put(1,"张三");
        map1.put(2,"赵四");
        HashMap<Integer,String> map2=new HashMap<>();
        map2.put(3,"王二");
        map2.put(4,"李四");
        HashMap<String,HashMap<Integer,String>> map=new HashMap<>();
        map.put("javaee",map1);
        map.put("javase",map2);
        Set<Map.Entry<String,HashMap<Integer,String>>> set=map.entrySet();/*把整个Map的Key和Set打包放进Set里面,然后再
        用增强For将Set里面的每个不同的Map提取出来再进行一次打包操作,再提取一次到最里层的Map就可以得出里层的Map和Set*/
        for(Map.Entry<String,HashMap<Integer,String>> entry:set){
            HashMap<Integer,String> hashMap =entry.getValue();
            Set<Integer> set1=hashMap.keySet();
            for(Integer Key:set1){
                System.out.println(Key+"........"+hashMap.get(Key));
            }
        }
    }
}
