import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import javax.swing.JCheckBoxMenuItem;
import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.KeyStroke;
public class jf extends JMenuBar {//继承了JMenuBar所以此时的构造函数就是add到JMenu上面,若没有继承的话需要新建一个JMenuBar;

    public jf(){
        add(employeemenu());//编辑职员菜单栏;
        add(helpmenu());//编辑帮助菜单栏;
        add(searchmenu());//编辑查询菜单栏;
        add(deletemenu());//编辑删除菜单栏;
        setVisible(true);
    }
    private JMenu employeemenu(){
         JMenu menu=new JMenu("员工信息处理");
         JMenuItem item=new JMenuItem("添加个人信息");
         menu.add(item);
         item=new JMenuItem("修改个人信息");
         menu.add(item);
         menu.addSeparator();
         item=new JMenuItem("查看个人信息");
         menu.add(item);
         item=new JMenuItem("删除个人信息");
         menu.add(item);
         return menu;
    }
    private JMenu helpmenu(){
        JMenu menu=new JMenu("打印处理");
        return menu;
    }
    private JMenu searchmenu(){
        JMenu menu=new JMenu("帮助");
        return menu;
    }
    private JMenu deletemenu(){
        JMenu menu=new JMenu("退出");
        return menu;
    }

    public static void main(String[] args) {
         JFrame frame=new JFrame("公司员工信息处理");
         frame.setSize(300,300);
         frame.setJMenuBar(new jf());
         frame.setVisible(true);
    }
}