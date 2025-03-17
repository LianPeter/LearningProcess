package exam7;
import java.util.Scanner;
public class exam7 {
    public static void main(String[] args) {
        Reversal();
        Upper();
    }
    public  static void Upper(){
        String s="jdk";
        String s1=s.toUpperCase();
        System.out.println(s1);
        for (int i = 1; i < s.length(); i++) {
            char c=s1.charAt(i);
            System.out.print(c);
        }
    }
    public  static void Account(){
        int NumberCnt=0;
        int UppercaseCnt=0;
        int LowercaseCnt=0;
        Scanner in=new Scanner(System.in);
        String s=in.next();
        for(char c:s.toCharArray()){
            if(Character.isDigit(c)){
                NumberCnt++;
            }else if(Character.isUpperCase(c)){
                UppercaseCnt++;
            } else if (Character.isLowerCase(c)) {
                LowercaseCnt++;
            }
        }
        System.out.println("大写字母的个数为:"+UppercaseCnt+"个");
        System.out.println("小写字母的个数为:"+LowercaseCnt+"个");
        System.out.println("数字的个数为:"+NumberCnt+"个");
    }
    public static void Reversal(){
        String s="To be or not to be";
        String ss[]=s.split(" ");
        StringBuffer s1=new StringBuffer();
        int len= ss.length;
        for(int i=0;i<len;i++){
            StringBuffer sb=new StringBuffer(ss[i]);
            if(i==len-1){
                s1.append(sb.reverse());
            }else{
                s1.append(sb.reverse()+" ");
            }
        }
        System.out.println(s1.toString());
    }
}
