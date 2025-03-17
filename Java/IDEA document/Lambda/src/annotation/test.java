package annotation;

public class test {
    public static void main(String[] args) {
        Class<bookshelf> bookshelfClass = bookshelf.class;
        boolean b=bookshelfClass.isAnnotationPresent(book.class);
        if(b){
            book book=bookshelfClass.getAnnotation(book.class);
            System.out.println(book.bookname());
            System.out.println(book.bookprice());
        }
    }
}
