package Studentmanager;
import java.util.InputMismatchException;
import  java.util.Scanner;
import  java.io.*;
import  java.util.logging.Logger;
import  java.util.logging.FileHandler;
import  java.util.logging.SimpleFormatter;

public class studentview {
    public static final Logger logger=Logger.getLogger("Code0701.MistakenNotModified");
    private int cnt=0;//使用cnt作为成员属性跟类同时一起出现作为student成员的添加数量;
    private Scanner in=new Scanner(System.in);
    private student[] students=new student[50];//存储student成员的数组;
    private student[] studentsNew =new student[students.length-1];//用来作为删除操作的copy数组,所以长度比原数组少1;
    public   void runStudent(){
        FileHandler fh;
        try{
            fh=new FileHandler("run.log",1000,2,true);
            fh.setFormatter(new SimpleFormatter());
            logger.addHandler(fh);
        }catch (IOException e){
            logger.warning("创建日志失败");
        }
        while(true) {
            System.out.println(" -----------------------------------------------");
            System.out.println("1.添加学生.");
            System.out.println("2.删除学生.");
            System.out.println("3.修改学生.");
            System.out.println("4.查询学生.");
            System.out.println("5.退出系统.");
            System.out.println("请输入要使用的功能:(输入1-5)");
            System.out.println(" -----------------------------------------------");
            int x=0;
            try {
                 x = in.nextInt();
            }catch (InputMismatchException e){
                logger.warning("输入格式错误,请输入1-5之间的数字");
                in.nextLine();
            }
                switch (x) {
                    case 1:
                        addStudent();
                        break;
                    case 2:
                        deleteStudent();
                        break;
                    case 3:
                        changeStudnt();
                        break;
                    case 4:
                        searchStudent();
                        break;
                    case 5:
                        System.out.println("是否要退出系统:(是的话输入1,否则输入0)");
                        int y = in.nextInt();
                        if (y == 1) {
                            return;
                        } else if (y == 0) {
                            break;
                        }
                    default:
                        System.out.println("没有这个功能呢,请您按可执行的数字输入:");
                }
            }
    }
    private  void addStudent(){
        System.out.println("请输入学生学号:");
        int id=0;
        try {
            id = in.nextInt();
        }catch (InputMismatchException e){
            logger.warning("数字输入错误");
            in.nextLine();
        }
        System.out.println("请输入学生名字:");
        String name=in.next();
        System.out.println("请输入学生年龄:");
        int age=in.nextInt();
        System.out.println("请输入学生性别:");
        String sex=in.next();
        student Student =new student(id,age,name,sex);//利用构造函数进行添加成员属性;
        System.out.println("添加成功!");
        students[cnt++]=Student;
    }
    private void deleteStudent(){
        System.out.println("请输入要删除的学生学号:");
        int number=in.nextInt();
        for(int i=0;i<cnt;i++){
            if(students[i].getId()==number){
                int deleteIndex=Arrayutil.searchIndex(students,number,cnt);//自己定义的工具类用于找到数组的下标值作为索引;
                System.arraycopy(students,0,studentsNew,0,deleteIndex);
                /*
                System.arraycopy作为一个基础的System类工具,用来复制数组内容,用法是(原数组,从数组的哪里开始复制过去,复制进去的数组,从哪里开始复制进来,复制多少个);
                上面的是把要删除的元素前的元素都复制进去;
                下面的是从被删除的位置开始把后面的元素都复制进去,保证可以没有空指针利于遍历;
                 */
                System.arraycopy(students,deleteIndex+1,studentsNew,deleteIndex,students.length-deleteIndex-1);
                students=studentsNew;
                cnt--;//执行完之后已有的成员数量要减一;
                System.out.println("删除成功!");
            }else{
                System.out.println("没有这个学生,再试试?");
            }
        }

    }
    private  void changeStudnt(){
        System.out.println("请输入要修改的学生学号:");
        int number=in.nextInt();
        int changeIndex=Arrayutil.searchIndex(students,number,cnt);
        System.out.println("请输入要修改的内容:");
        System.out.println(" -----------------------------" );
        System.out.println("1.年龄" );
        System.out.println("2.性别" );
        System.out.println(" -----------------------------" );
        int number1=in.nextInt();
        switch (number1){
            case 1:
                System.out.println("请输入修改后的年龄是:");
                int age=in.nextInt();
                students[changeIndex].setAge(age);
                System.out.println("修改成功!");
                break;
            case 2:
                System.out.println("请输入修改后的性别是:");
                String sex=in.next();
                students[changeIndex].setSex(sex);
                System.out.println("修改成功!");
                break;
        }
    }
    private void searchStudent() {
        if(cnt>0) {//利用冒泡排序现将已有的成员按学号大小排序,以防因为输入原因造成显示混乱,且要有成员录入时才可输出;
            for (int i = 0; i < cnt; i++) {
                for (int j = 0; j < cnt - i - 1; j++) {
                    student temp;
                    if (students[j].getId() > students[j + 1].getId()) {
                        temp = students[j + 1];
                        students[j + 1] = students[j];
                        students[j] = temp;
                    }
                }
            }
        }
        if (cnt == 0) {
            System.out.println("不好意思,您还未添加任何学生信息,请重试");
        }else{
            System.out.println("查询结果如下" );
            System.out.println(" -----------------------------" );
            System.out.println("学号" + "\t  "  + "姓名" + "\t  " + "年龄" + "\t  " + "性别");
            for(int i=0;i<cnt;i++){
                System.out.println(students[i].getId()+ "\t" + students[i].getName() + "\t" +students[i].getAge() + "\t" + students[i].getSex());
            }
            System.out.println(" -----------------------------" );
        }
    }
}
