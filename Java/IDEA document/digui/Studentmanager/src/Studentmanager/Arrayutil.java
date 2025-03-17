package Studentmanager;

public class Arrayutil {
    public static int searchIndex(student student[],int id,int cnt){
        int Index=0;
        for(int i=0;i<cnt;i++){
            if(id==student[i].getId()){
                Index=i;
            }
        }
        return Index;
    }
}
