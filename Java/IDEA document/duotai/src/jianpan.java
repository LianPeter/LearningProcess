public class jianpan implements USB{
    @Override
    public void open() {
        System.out.println("键盘按键开机");
    }

    @Override
    public void close() {
        System.out.println("键盘按键关机");
    }
    public void press(){
        System.out.println("键盘按动");
    }
}
