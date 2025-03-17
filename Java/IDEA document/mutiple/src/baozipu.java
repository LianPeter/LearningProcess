public class baozipu {
    private boolean flag;
    private int count;

    public baozipu(){
    }

    public baozipu(int count,boolean flag){
        this.count=count;
        this.flag=flag;
    }
    public synchronized void  getCount(){
            if (this.flag==false){
                try{
                    this.wait();
                }catch (InterruptedException e){
                    throw  new RuntimeException(e);
                }
            }
            this.flag=false;
            System.out.println("消费了第"+count+"个包子");
            this.notify();
    }

    public synchronized void  setCount(){
            if (this.flag==true){
                try{
                    this.wait();
                }catch (InterruptedException e){
                    throw  new RuntimeException(e);
                }
            }
            count++;
            System.out.println("生产了第"+count+"个包子");
            this.flag=true;
            this.notify();
    }
}
