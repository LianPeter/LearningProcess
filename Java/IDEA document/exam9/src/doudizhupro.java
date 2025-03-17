import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;

public class doudizhupro {
    public static void main(String[] args) {
        String color[]="♥-♠-♦-♣".split("-");
        //创建花色数组;
        String number[]="2-3-4-5-6-7-8-9-10-J-Q-K-A".split("-");
        //创建数字数组;
        HashMap<Integer,String> map=new HashMap<>();
        //创建一个HashMap专门存储组合好的牌;
        ArrayList<Integer> list=new ArrayList<>();
        //创建一个ArrayList专门存储花色;
        list.add(0);//大王;
        list.add(1);//小王;
        int Key=2;
        //定义Key为2，作为list的索引;
        for(String num:number){
            for(String huase:color){
                String pokers=huase+num;
                map.put(Key,pokers);
                list.add(Key);
                Key++;
            }
        }
        //将索引和花色添加到map和list当中去;
        map.put(0,"BK");
        map.put(1,"SK");
        //再将大王小王单独放进map里面;
        Collections.shuffle(list);
        //打乱牌;
        ArrayList<Integer> p1=new ArrayList<>();
        ArrayList<Integer> p2=new ArrayList<>();
        ArrayList<Integer> p3=new ArrayList<>();
        ArrayList<Integer> dipai=new ArrayList<>();
        //创建三名玩家和一个有底牌的电脑;
        for(int i=0;i<list.size();i++){
            Integer key1=list.get(i);
            if(i>=51){
                dipai.add(key1);
            } else if (i%3==0) {
                p1.add(key1);
            }else if(i%3==1){
                p2.add(key1);
            } else if (i%3==2) {
                p3.add(key1);
            }
        }
        //根据list的索引随机发牌给三个玩家,并将三张多出来的底牌给电脑;
        Collections.sort(p1);
        Collections.sort(p2);
        Collections.sort(p3);
        Collections.sort(dipai);
        //根据Collections的方法将他们得到的牌号按顺序整理;
        lookpoker("p1",p1,map);
        lookpoker("p2",p2,map);
        lookpoker("p3",p3,map);
        lookpoker("dipai",dipai,map);
        //定义了看牌的方法根据list中的索引作为map中的key去找到相对应的value，既通过数字去找相对于的花色,然后输出;
    }
    public static void lookpoker(String name,ArrayList<Integer> list,HashMap<Integer,String> map){
        System.out.print(name+":[");
        for(Integer Key: list){
            String poker=map.get(Key);
            System.out.print(poker+" ");
        }
        System.out.println("]");
    }
}
