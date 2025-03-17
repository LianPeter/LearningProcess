package ATM;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.util.Date;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public class DepositFrame {
    private JButton depositButton, quitButton, backButton;
    private JLabel depositLabel;
    private JTextField depositField;
    protected JFrame depositFrame;
    private JPanel jp;
    private Logger logger = Logger.getLogger("Warning");
    private static FileHandler fh = null;

    public DepositFrame(ATMSystem member) {
        depositFrame = new JFrame();
        depositFrame.setTitle("ATM存款系统");
        depositFrame.setLocationRelativeTo(null);
        depositFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        depositFrame.setSize(400, 200);

        jp = new JPanel();
        jp.setLayout(null);

        depositButton = new JButton("存款");
        quitButton = new JButton("退出系统");
        backButton = new JButton("返回上一界面");
        depositLabel = new JLabel("请输入存款的金额:");
        depositField = new JTextField();

        depositLabel.setBounds(10, 10, 150, 50);
        depositField.setBounds(160, 10, 150, 50);
        depositButton.setBounds(25, 100, 100, 40);
        quitButton.setBounds(125, 100, 100, 40);
        backButton.setBounds(225, 100, 150, 40);

        depositButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    int cash = Integer.parseInt(depositField.getText());
                    if (cash > 0 && cash % 100 == 0) {
                        member.setMoney(Integer.parseInt(depositField.getText()) + member.getMoney());
                        JOptionPane.showMessageDialog(null, "存款成功", "存款系统", 1);
                        savedata(member);
                    } else if (cash % 100 != 0) {
                        JOptionPane.showMessageDialog(null, "请每次存入100的倍数的金额,不能为负数", "存款系统", 0);
                    }
                    depositField.setText(null);
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
                depositFrame.setVisible(false);
                new OperationFrame(member).operationFrame.setVisible(true);
            }
        });

        jp.add(depositButton);
        jp.add(quitButton);
        jp.add(backButton);
        jp.add(depositLabel);
        jp.add(depositField);

        depositFrame.add(jp);
        depositFrame.setVisible(true);
    }

    public void savedata(ATMSystem member){
        File f1 = new File("D:\\IDEA document\\ATM\\src\\ATM\\deposit.txt");
        PrintWriter pw=null;
        Date date = new Date();
        String s = "存款时间为:" + date + "\t" + "存款金额为:" + depositField.getText()+"\n";
        try {
            if(fh==null) {
                fh = new FileHandler("deposit.log", true);
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
