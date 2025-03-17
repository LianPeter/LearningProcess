public class bijiben {
    public void start(){
        System.out.println("笔记本开机");
    }
    public void stop(){
        System.out.println("笔记本关机");
    }
    public void useUSB(USB usb){
        if(usb instanceof  shubiao){
            shubiao sb=new shubiao();
            sb=(shubiao) usb;
            sb.click();
        }
        usb.close();
        usb.open();
    }
}
