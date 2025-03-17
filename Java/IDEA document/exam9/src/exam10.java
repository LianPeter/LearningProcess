import javax.swing.*;

public class exam10 extends JFrame{
    private JButton registerbutton,loginbutton,logoutbutton;
    private JLabel zhanghaolabel,passwordlabel,passwordlabel1,namelabel,apartmentlabel;
    private JTextField zhanghaotext,passwordtext,passwordtext1,nametext;
    private JComboBox apartmentBox;
    public exam10(){
        setTitle("注册");
        setSize(400,400);
        setLocation(400,400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(null);
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



        add(registerbutton);
        add(loginbutton);
        add(logoutbutton);
        add(zhanghaolabel);
        add(zhanghaotext);
        add(passwordlabel);
        add(passwordtext);
        add(passwordlabel1);
        add(passwordtext1);
        add(namelabel);
        add(nametext);
        add(apartmentlabel);
        add(apartmentBox);


        setVisible(true);

    }

    public static void main(String[] args) {
        new exam10();
    }
}
