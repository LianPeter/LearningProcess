import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class zhengze {
    public static void main(String[] args) {
        String s;
        Scanner in=new Scanner(System.in);
        s=in.next();
        String pattern="^\\d+(\\d.\\d{1,2})$";
        Pattern pattern1= Pattern.compile(pattern);
        Matcher matcher= pattern1.matcher(s);
        System.out.println(matcher.find());
    }
}
