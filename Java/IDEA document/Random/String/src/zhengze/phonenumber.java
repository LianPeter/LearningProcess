package zhengze;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class phonenumber {
    public static void main(String[] args){
        Pattern p=null;
        Matcher m=null;
        boolean b=false;
        p=Pattern.compile("^[1][3-9]\\d{9}");
        String number[]={"19163854473","19174104810","133212","18977181950","1112313aaa"};
        for(String s:number){
            m=p.matcher(s);
            b=m.matches();
            if(b) {
                System.out.println("手机号码正确:" + s + " " + b);
            }else{
                System.out.println("手机号码错误:"+s+" "+b);
            }
        }
    }
}
