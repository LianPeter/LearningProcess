public class shubiao implements USB{
    @Override
    public void close() {
        System.out.println("鼠标点击关机");
    }

    @Override
    public void open() {
        System.out.println("鼠标点击开机");
    }
    public void click(){
        System.out.println("点击");
    }
}
