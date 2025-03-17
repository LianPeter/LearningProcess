public class productor implements Runnable {
    baozipu baozipu;
    public productor(baozipu baozipu){
        this.baozipu=baozipu;
    }
    public void run(){
        while (true){
            try {
                Thread.sleep(500L);
            }catch (InterruptedException e){
                throw new RuntimeException(e);
            }
            baozipu.setCount();
            }
        }
    }

