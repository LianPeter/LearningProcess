package Frame;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class frame  {
    JFrame jFrame;
    public  frame(){
        jFrame =new JFrame();
        jFrame.setSize(300,300);
        jFrame.setTitle("测试窗口");
        jFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jFrame.setLocationRelativeTo(null);
        JPanel jPanel=new JPanel();
        jPanel.setLayout(null);
        JButton jButton1;
        jButton1=new JButton("1");
        jButton1.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {

            }
        });

        JLabel jLabel1,jLabel2;
        JTextField jTextField1,jTextField2;
        jLabel1=new JLabel("数学");
        jLabel2=new JLabel("英语");
        jTextField1=new JTextField();
        jTextField2=new JTextField();
        jPanel.add(jLabel1);
        jPanel.add(jTextField1);
        jPanel.add(jLabel2);
        jPanel.add(jTextField2);
        jPanel.add(jButton1);
        jFrame.add(jPanel);
        jFrame.setVisible(true);
    }

    public static void main(String[] args) {
        new frame();
    }
}
