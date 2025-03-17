package zhengze;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class individualNumber {
    public static void main(String[] args) {
        Pattern p = null;
        Matcher m = null;
        boolean b = false;
        p = Pattern.compile("^[4]\\d{16}[0-9x]?$");/*
        ^：匹配输入的开始位置。
       [4]：匹配数字 4。
       [0-9x]?：匹配一个数字（0 到 9）或者字母 x，但它是可选的（问号表示前面的字符是可选的）。
       $：匹配输入的结束位置。
        \\d{13}：匹配 13 个数字。
        */
        String number[] = {"450107200412115710", "450107200112115710", "45010720041222571x", "18977181950", "1112313aaa"};
        for (String s : number) {
            m = p.matcher(s);
            b = m.matches();
            if (b) {
                System.out.println("身份证号正确:" + s + " " + b);
            } else {
                System.out.println("身份证号错误:" + s + " " + b);
            }
        }
    }
}
