package ATM;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class OperationFrame {
    public JFrame operationFrame;
    private JPanel operationPanel;
    private JButton searchButton,withdrawButton,depositButton,modifyButton;
    private JLabel operationLabel;

    public OperationFrame(ATMSystem member) {
        operationFrame = new JFrame();
        operationFrame.setSize(320, 300);
        operationFrame.setTitle("ATM操作系统");
        operationFrame.setLocationRelativeTo(null);
        operationFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        operationPanel = new JPanel();
        operationPanel.setLayout(null);

        searchButton = new JButton("查询余额功能");
        withdrawButton = new JButton("取款功能");
        depositButton = new JButton("存款功能");
        modifyButton = new JButton("修改密码功能");
        searchButton.setBounds(10, 100, 140, 40);
        withdrawButton.setBounds(150, 100, 140, 40);
        depositButton.setBounds(10, 140, 140, 40);
        modifyButton.setBounds(150, 140, 140, 40);

        searchButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                JOptionPane.showMessageDialog(null, "您账户剩余余额为:" + member.getMoney(), "余额", 1);
            }
        });

        withdrawButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                operationFrame.setVisible(false);
                new WithdrawFrame(member).withdrawFrame.setVisible(true);
            }
        });

        depositButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                operationFrame.setVisible(false);
                new DepositFrame(member).depositFrame.setVisible(true);
            }
        });

        modifyButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                operationFrame.setVisible(false);
                new ModifyFrame(member).modifyFrame.setVisible(true);
            }
        });

        operationLabel = new JLabel("请选择你要使用的功能");
        operationLabel.setBounds(100, 20, 150, 50);

        operationPanel.add(searchButton);
        operationPanel.add(withdrawButton);
        operationPanel.add(depositButton);
        operationPanel.add(modifyButton);
        operationPanel.add(operationLabel);

        operationFrame.add(operationPanel);
    }
}
