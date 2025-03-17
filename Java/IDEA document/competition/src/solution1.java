import java.util.Scanner;

 class Solution {
     public static void main(String[] args) {
         int A,B,C,D;
         Scanner sc=new Scanner(System.in);
         A=sc.nextInt();
         B= sc.nextInt();
         C=sc.nextInt();
         D=sc.nextInt();
         int area1=A*B;
         int area2=C*D;
         if(area1>area2){
             System.out.println(area1);
         } else if (area1<area2) {
             System.out.println(area2);
         } else{
             System.out.println(area1);
         }
     }
 }