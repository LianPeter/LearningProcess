package Employ;

public class Network extends Maintainer{
    public void work() {
        System.out.println("员工号为:"+this.getId()+"员工名为:"+this.getName());
        System.out.println("此员工正在检查网络是否通畅");
    }
}
