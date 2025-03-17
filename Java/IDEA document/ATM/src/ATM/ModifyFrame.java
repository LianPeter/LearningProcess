package ATM;

import javax.swing.*;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class ModifyFrame {
    protected JFrame modifyFrame;
    private JPanel modifyPanel;
    private JLabel passwordLabel, confirmpasswordLabel,getPasswordLabel,getConfirmpasswordLabel;
    private JTextField passwordField, confirmpasswordField;
    private JButton modifyButton, backButton, quitButton;

    public ModifyFrame(ATMSystem member) {
        modifyFrame = new JFrame();
        modifyFrame.setLocationRelativeTo(null);
        modifyFrame.setTitle("ATM修改密码系统");
        modifyFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        modifyFrame.setSize(450, 300);

        modifyPanel = new JPanel();
        modifyPanel.setLayout(null);

        passwordLabel = new JLabel("请输入要修改的密码");
        confirmpasswordLabel = new JLabel("请确认要修改的密码");
        passwordLabel.setBounds(5, 10, 150, 40);
        confirmpasswordLabel.setBounds(5, 70, 150, 40);

        getPasswordLabel=new JLabel();
        getConfirmpasswordLabel=new JLabel();
        getPasswordLabel.setBounds(310,10,100,40);
        getConfirmpasswordLabel.setBounds(310,70,100,40);

        passwordField = new JTextField();
        confirmpasswordField = new JTextField();
        passwordField.setBounds(155, 10, 150, 40);
        confirmpasswordField.setBounds(155, 70, 150, 40);

        modifyButton = new JButton("确认修改密码");
        backButton = new JButton("返回上一界面");
        quitButton = new JButton("退出系统");
        modifyButton.setBounds(10, 140, 130, 40);
        backButton.setBounds(140, 140, 130, 40);
        quitButton.setBounds(270, 140, 110, 40);

        modifyButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    String password = passwordField.getText();
                    String confirmpassword = confirmpasswordField.getText();

                    if (password.length() >= 6 && confirmpassword.length() >= 6) {
                        if (confirmpassword.equals(password)) {
                            if (checkalldigitsame(password)) {
                                member.setPassword(password);
                                JOptionPane.showMessageDialog(null, "修改密码成功,请重新登入", "ATM修改密码系统", 1);
                                modifyFrame.setVisible(false);
                                new LoginFrame(member).loginFrame.setVisible(true);
                            } else {
                                JOptionPane.showMessageDialog(null, "修改密码失败,不允许全部数字完全相同", "ATM修改密码系统", 0);
                            }
                        } else {
                            JOptionPane.showMessageDialog(null, "修改密码失败,两次密码不相同", "ATM修改密码系统", 0);
                        }
                    } else {
                        JOptionPane.showMessageDialog(null, "修改密码失败,密码位数至少要是六位数字(1-9)且包括大小写和特殊符号", "ATM修改密码系统", 0);
                    }
                } catch (NumberFormatException e1){
                    JOptionPane.showMessageDialog(null, "请输入1-9的数字", "取款系统", 0);
                }
            }
        });

        passwordField.getDocument().addDocumentListener(new DocumentListener() {
            @Override
            public void insertUpdate(DocumentEvent e) {
                detectContent(passwordField.getText());
            }

            @Override
            public void removeUpdate(DocumentEvent e) {
                detectContent(passwordField.getText());
            }

            @Override
            public void changedUpdate(DocumentEvent e) {
                detectContent(passwordField.getText());
            }
        });

        confirmpasswordField.getDocument().addDocumentListener(new DocumentListener() {
            @Override
            public void insertUpdate(DocumentEvent e) {
                detectContent1(confirmpasswordField.getText());
            }

            @Override
            public void removeUpdate(DocumentEvent e) {
                detectContent1(confirmpasswordField.getText());
            }

            @Override
            public void changedUpdate(DocumentEvent e) {
                detectContent1(confirmpasswordField.getText());
            }
        });
        backButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                modifyFrame.setVisible(false);
                new OperationFrame(member).operationFrame.setVisible(true);
            }
        });

        quitButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });

        modifyPanel.add(modifyButton);
        modifyPanel.add(backButton);
        modifyPanel.add(quitButton);
        modifyPanel.add(passwordLabel);
        modifyPanel.add(confirmpasswordLabel);
        modifyPanel.add(passwordField);
        modifyPanel.add(confirmpasswordField);
        modifyPanel.add(getPasswordLabel);
        modifyPanel.add(getConfirmpasswordLabel);

        modifyFrame.add(modifyPanel);
        modifyFrame.setVisible(true);
    }

    public static boolean checkalldigitsame(String s) {
        char digit[] = s.toCharArray();
        char firstdigit = digit[0];
        for (int i = 1; i < digit.length; i++) {
            if (firstdigit != digit[i]) {
                return true;
            }
        }
        return false;
    }

    private void detectContent(String text) {
        if(text.length()<7){
            getPasswordLabel.setText("密码长度不足");
        }else if(!(text.matches("^[A-Z]*[a-z]*[1-9]*[?!#&@]$"))){
            getPasswordLabel.setText("密码强度过低");
        }else{
            getPasswordLabel.setText(null);
        }
    }

    private void detectContent1(String text) {
        if(text.length()<7){
            getConfirmpasswordLabel.setText("密码长度不足");
        }else if(!(text.matches("^[A-Z]*[a-z]*[1-9]*[?!#&@]$"))){
            getConfirmpasswordLabel.setText("密码强度过低");
        }else{
            getConfirmpasswordLabel.setText(null);
        }
    }

}