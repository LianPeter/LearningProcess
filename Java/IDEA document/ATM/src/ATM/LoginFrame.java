package ATM;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class LoginFrame {
    public JFrame loginFrame;
    private JPanel LoginPanel;
    private JLabel idLabel,passwordLabel;
    private JTextField idField,passwordField;
    private JButton LoginButton;

    public LoginFrame(ATMSystem member) {
        loginFrame=new JFrame();
        loginFrame.setTitle("ATM登入系统");
        loginFrame.setLocationRelativeTo(null);
        loginFrame.setSize(300, 250);
        loginFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        LoginPanel = new JPanel();
        LoginPanel.setLayout(null);

        idField = new JTextField();
        idLabel = new JLabel("请输入卡号:");
        idLabel.setBounds(10, 5, 100, 50);
        idField.setBounds(110, 10, 120, 35);

        passwordField = new JTextField();
        passwordLabel = new JLabel("请输入密码:");
        passwordLabel.setBounds(10, 55, 100, 50);
        passwordField.setBounds(110, 60, 120, 35);

        LoginButton = new JButton("登入");
        LoginButton.setBounds(70, 120, 120, 50);

        LoginButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                    if (idField.getText().equals(member.getID()) && passwordField.getText().equals(member.getPassword())) {
                        JOptionPane.showMessageDialog(null, "登入成功,请继续操作", "正确", 1);
                        loginFrame.setVisible(false);
                        new OperationFrame(member).operationFrame.setVisible(true);

                    } else {
                        JOptionPane.showMessageDialog(null, "登入失败,请检查账号密码(为1-9的数字)", "错误", 0);
                    }
                }
        });

        LoginPanel.add(LoginButton);
        LoginPanel.add(idField);
        LoginPanel.add(idLabel);
        LoginPanel.add(passwordField);
        LoginPanel.add(passwordLabel);

        loginFrame.add(LoginPanel);
    }
}
