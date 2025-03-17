import java.util.concurrent.Callable;

public class MyString implements Callable<String> {
    @Override
    public String call() throws Exception {
        return "这是线程池任务";
    }
}
