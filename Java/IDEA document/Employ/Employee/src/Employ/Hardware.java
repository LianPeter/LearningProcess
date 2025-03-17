package Employ;

public class Hardware extends Maintainer{
    public void work() {
        System.out.println("员工号为:"+this.getId()+"员工名为:"+this.getName());
        System.out.println("此员工正在修复电脑主板");
    }
}
