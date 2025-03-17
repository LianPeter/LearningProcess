package Reflect;

import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.Properties;

public class reflect {
    public static void main(String[] args)throws Exception {
        //创建属性集,用于读取类中的方法
        Properties properties = new Properties();
        InputStream in = reflect.class.getClassLoader().getResourceAsStream("pro.Properties");
        properties.load(in);
        //通过属性集读取类名然后得到方法名和类名,通过类名实例化对象,通过方法名得到方法;
        String className = properties.getProperty("className");
        String methodName = properties.getProperty("methodName");
        Class<?> aClass = Class.forName(className);
        Object o = aClass.newInstance();
        Method method = aClass.getDeclaredMethod(methodName);
        method.setAccessible(true);
        method.invoke(o);
    }
}
