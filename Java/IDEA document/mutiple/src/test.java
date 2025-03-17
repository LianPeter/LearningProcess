public class test {
    public static void main(String[] args) {
        baozipu baozipu = new baozipu();
        consumer consumer = new consumer(baozipu);
        productor productor = new productor(baozipu);

        Thread t1=new Thread(productor);
        Thread t2=new Thread(consumer);

        t1.start();
        t2.start();
    }
}
