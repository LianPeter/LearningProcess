import  java.util.Scanner;
public class solution {
    public static void main(String[] args) {
        Scanner in=new Scanner(System.in);
        int n,m,k;
        n=in.nextInt();
        m=in.nextInt();
        k=in.nextInt();
        int last=m;
        int [] width=new int[n];
        for(int i=0;i<m;i++){
            int numebr= in.nextInt()-1;
            width[numebr]=1;
            for(int j=1;j<=k;j++){
                if(numebr+j<m){
                    width[numebr+j]=1;
                    last++;
                }
                if(numebr-j>=0){
                    width[numebr-j]=1;
                    last++;
                }
            }
        }
        int least=n-last;
        System.out.println(least/(k*2+1));
    }
}


