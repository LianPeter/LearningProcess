package Studentmanager;
/*
创建一个javabean类型的student类作为基础让view进行使用;
 */
public class student {
    private int id;
    private int age;
    private String name;
    private String sex;
    public student(int id,int age,String name,String sex){
        this.id=id;
        this.name=name;
        this.age=age;
        this.sex=sex;
    }
    public int getId() {
        return id;
    }

    public int getAge() {
        return age;
    }

    public String getName() {
        return name;
    }

    public String getSex() {
        return sex;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setName(String name){
        this.name=name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
