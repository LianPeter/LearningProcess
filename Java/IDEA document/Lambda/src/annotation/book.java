package annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@SuppressWarnings("all")
@Retention(RetentionPolicy.RUNTIME)
public @interface book {
    String bookname();
    int bookprice();
}
