import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ExecutorService es=Executors.newFixedThreadPool(2);
        Future<String> stringFuture=es.submit(new MyString());
        Future<Integer> integerFuture=es.submit(new Mynumber());
        Future<String> stringFuture1=es.submit(new MyString());
        Future<Integer> integerFuture1=es.submit(new Mynumber());
        System.out.println(stringFuture.get());
        System.out.println(integerFuture.get());
        System.out.println(stringFuture1.get());
        System.out.println(integerFuture1.get());

        es.shutdown();
    }
}
