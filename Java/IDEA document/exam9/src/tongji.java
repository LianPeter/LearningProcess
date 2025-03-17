import java.util.HashMap;
import java.util.Scanner;

public class tongji {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        HashMap<String, Integer> map = new HashMap<>();
        String data = sc.next();
        char[] datas = data.toCharArray();
        for(char achar:datas){
            String Key=achar+" ";
            if(!map.containsKey(Key)){
                map.put(Key,1);
            }else{
                Integer Value=map.get(Key);
                Value++;
                map.put(Key,Value);
            }
        }
        System.out.println(map);
    }
}
