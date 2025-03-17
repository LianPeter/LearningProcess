package Employ;

public class JavaEE  extends Developer{
    @Override
    public void work() {
        System.out.println("员工号为:"+this.getId()+"员工名为:"+this.getName());
        System.out.println("此员工正在研发电商网站");
    }
}
