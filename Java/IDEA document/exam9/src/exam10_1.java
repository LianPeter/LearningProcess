import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class exam10_1{
    private JFrame frame;//创建窗口;
    private JPanel CurrentPanel;//创建当前操作的面板;
    private JPanel LoginPanel;//创建登入界面的面板;
    private JPanel RegisterPanel;//创建注册界面的面板;
    private JPanel OperationPanel;//创建操作界面的面板;
    public exam10_1(){
        frame=new JFrame("登入与注册界面");//设置窗口的名字标题;
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);//设置窗口点击×就退出程序;
        frame.setSize(400,400);//设置窗口的大小
        frame.setLocationRelativeTo(null);//居中显示;

        LoginPanel=LoginPanel();
        RegisterPanel=RegisterPanel();
        //OperationPanel=OperationPanel();

        CurrentPanel=LoginPanel;
        frame.add(CurrentPanel);
        frame.setVisible(true);

    }
    private JPanel LoginPanel(){
        JPanel jp=new JPanel();
        jp.setLayout(null);

        JButton registerbutton,loginbutton,logoutbutton;
        JLabel zhanghaolabel,passwordlabel,namelabel,apartmentlabel;
        JTextField zhanghaotext,passwordtext,nametext;
        JComboBox apartmentBox;

        registerbutton=new JButton("注册");
        registerbutton.setBounds(50,275,100,60);

        loginbutton=new JButton("登入");
        loginbutton.setBounds(150,275,100,60);

        logoutbutton=new JButton("登出");
        logoutbutton.setBounds(250,275,100,60);

        zhanghaolabel=new JLabel("请您输入账号");
        zhanghaolabel.setBounds(50,25,150,40);
        zhanghaotext=new JTextField();
        zhanghaotext.setBounds(200,25,150,40);

        passwordlabel=new JLabel("请您输入密码");
        passwordlabel.setBounds(50,75,150,40);
        passwordtext=new JTextField();
        passwordtext.setBounds(200,75,150,40);


        namelabel=new JLabel("请您输入姓名");
        namelabel.setBounds(50,130,150,40);
        nametext=new JTextField();
        nametext.setBounds(200,130,150,40);

        apartmentlabel=new JLabel("请选择你的部门");
        apartmentlabel.setBounds(70,215,150,40);

        String s[]={"财务部","销售部","技术部","采购部","生产部","质管部","人事部"};
        apartmentBox=new JComboBox(s);
        apartmentBox.setBounds(160,215,150,40);

        loginbutton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String Userzhanghao=zhanghaotext.getText();
                String UserPassword=passwordtext.getText();
                String Username=nametext.getText();
                if(Userzhanghao.equals("123456")&&UserPassword.equals("123456")&&Username.equals("zhangsan")){
                    JOptionPane.showMessageDialog(null,"登入成功","提示",1);
                }else{
                    JOptionPane.showMessageDialog(null,"登入失败,请重新输入或注册","错误",0);
                }
            }
        });

        registerbutton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                showPanel(RegisterPanel);
            }
        });

        logoutbutton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });

        jp.add(registerbutton);
        jp.add(loginbutton);
        jp.add(logoutbutton);
        jp.add(zhanghaolabel);
        jp.add(zhanghaotext);
        jp.add(passwordlabel);
        jp.add(passwordtext);
        jp.add(namelabel);
        jp.add(nametext);
        jp.add(apartmentlabel);
        jp.add(apartmentBox);

        return jp;
    }

    private JPanel RegisterPanel(){
        JPanel jp=new JPanel();
        jp.setLayout(null);

        JButton registerbutton;
        JLabel zhanghaolabel,passwordlabel,passwordlabel1,namelabel,apartmentlabel;
        JTextField zhanghaotext,passwordtext,passwordtext1,nametext;
        JComboBox apartmentBox;

        registerbutton=new JButton("注册");
        registerbutton.setBounds(50,275,100,60);


        zhanghaolabel=new JLabel("请您输入账号");
        zhanghaolabel.setBounds(50,25,150,40);
        zhanghaotext=new JTextField();
        zhanghaotext.setBounds(200,25,150,40);

        passwordlabel=new JLabel("请您输入密码");
        passwordlabel.setBounds(50,75,150,40);
        passwordtext=new JTextField();
        passwordtext.setBounds(200,75,150,40);

        passwordlabel1=new JLabel("请您再一次输入密码");
        passwordlabel1.setBounds(50,125,150,40);
        passwordtext1=new JTextField();
        passwordtext1.setBounds(200,125,150,40);

        namelabel=new JLabel("请您输入姓名");
        namelabel.setBounds(50,175,150,40);
        nametext=new JTextField();
        nametext.setBounds(200,175,150,40);

        apartmentlabel=new JLabel("请选择你的部门");
        apartmentlabel.setBounds(70,215,150,40);

        String s[]={"财务部","销售部","技术部","采购部","生产部","质管部","人事部"};
        apartmentBox=new JComboBox(s);
        apartmentBox.setBounds(160,215,150,40);

        registerbutton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                JOptionPane.showMessageDialog(null,"注册成功,请重新登入","提示",1);
                showPanel(LoginPanel);
            }
        });

        jp.add(registerbutton);
        jp.add(zhanghaolabel);
        jp.add(zhanghaotext);
        jp.add(passwordlabel);
        jp.add(passwordtext);
        jp.add(passwordlabel1);
        jp.add(passwordtext1);
        jp.add(namelabel);
        jp.add(nametext);
        jp.add(apartmentlabel);
        jp.add(apartmentBox);

        return jp;
    }

    private void showPanel(JPanel jPanel){
        frame.getContentPane().remove(CurrentPanel);//获取当前的面板并移除;
        frame.getContentPane().add(jPanel);//获取当前的面板并添加新的面板;
        CurrentPanel=jPanel;//将当前的面板更新为现在显示的面板保证下次更新能正确;
        frame.revalidate();//重新加载窗口;
        frame.repaint();//重新绘制窗口;
    }

    public static void main(String[] args) {
        exam10_1 jf=new exam10_1();
    }
}
