package ATM;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.util.Date;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public  class WithdrawFrame {
    private JButton withdrawButton, quitButton, backButton;
    private JLabel withdrawLabel;
    private JTextField withdrawField;
    protected JFrame withdrawFrame;
    private JPanel jp;
    private static Logger logger = Logger.getLogger("Warning");
    private static FileHandler fh = null;

    public WithdrawFrame(ATMSystem member) {
        withdrawFrame = new JFrame();
        withdrawFrame.setTitle("ATM取款系统");
        withdrawFrame.setLocationRelativeTo(null);
        withdrawFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        withdrawFrame.setSize(400, 200);

         jp = new JPanel();
        jp.setLayout(null);

        withdrawButton = new JButton("取款");
        quitButton = new JButton("退出系统");
        backButton = new JButton("返回上一界面");
        withdrawLabel = new JLabel("请输入取款的金额:");
        withdrawField = new JTextField();

        withdrawLabel.setBounds(10, 10, 150, 50);
        withdrawField.setBounds(160, 10, 150, 50);
        withdrawButton.setBounds(25, 100, 100, 40);
        quitButton.setBounds(125, 100, 100, 40);
        backButton.setBounds(225, 100, 150, 40);

        withdrawButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    int cash = Integer.parseInt(withdrawField.getText());
                    int balance = member.getMoney() - cash;
                    if (member.getMoney() >= cash && (cash % 50 == 0 || cash % 100 == 0)) {
                        member.setMoney(balance);
                        JOptionPane.showMessageDialog(null, "取款成功", "取款系统", 1);
                        savedata(member);
                    } else if (balance < 0) {
                        JOptionPane.showMessageDialog(null, "取款失败,余额不足", "取款系统", 0);
                    } else if (cash >= 5000) {
                        JOptionPane.showMessageDialog(null, "取款失败,单次不能取超过5000块", "取款系统", 0);
                    } else if (cash % 50 != 0 || cash % 100 != 0 || cash == 0) {
                        JOptionPane.showMessageDialog(null, "取款失败,请取50,100的倍数", "取款系统", 0);
                    }
                    withdrawField.setText(null);
                }catch (NumberFormatException e1){
                    JOptionPane.showMessageDialog(null, "请输入正确的金额数字(例如100)", "取款系统", 0);
                }
            }
        });

        quitButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });

        backButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                OperationFrame OF = new OperationFrame(member);
                withdrawFrame.setVisible(false);
                OF.operationFrame.setVisible(true);
            }
        });

        jp.add(withdrawButton);
        jp.add(quitButton);
        jp.add(backButton);
        jp.add(withdrawLabel);
        jp.add(withdrawField);

        withdrawFrame.add(jp);
        withdrawFrame.setVisible(true);
    }
    public void savedata(ATMSystem member) {
        File f1 = new File("D:\\IDEA document\\ATM\\src\\ATM\\withdraw.txt");
        PrintWriter pw=null;
        Date date = new Date();
        String s = "取款时间为:" + date + "\t" + "取款金额为:" + withdrawField.getText()+"\n";
        try {
            if(fh==null) {
                fh = new FileHandler("withdraw.log", true);
                logger.addHandler(fh);
                SimpleFormatter formatter = new SimpleFormatter();
                fh.setFormatter(formatter);
            }
        } catch (IOException e) {
            logger.warning("创建日志失败");
        }
        try {
            f1.createNewFile();
            pw=new PrintWriter(new FileWriter(f1,true));
            pw.println(member);
            pw.println(s);
        } catch (IOException e) {
            logger.warning("文件创建失败");
        } finally {
            try {
                pw.close();
            } catch (NullPointerException e) {
                logger.warning("文件关闭异常");
            }
        }
    }
}

