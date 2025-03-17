import  javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.DecimalFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class calculate {
    private JPanel jp;
    private JFrame jf;
    private JButton averageButton;
    private JLabel chineseLabel,mathLabel,averageLabel;
    private JTextField chineseField,mathField,averageField;
    public calculate(){
        jf=new JFrame("求平均分");
        jf.setSize(250,250);
        jf.setLocationRelativeTo(null);
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jp=new JPanel(null);

        averageButton=new JButton("求平均分");
        averageButton.setBounds(0,170,250,40);


        chineseLabel=new JLabel("语文:");
        chineseLabel.setBounds(0,0,100,40);
        chineseField=new JTextField();
        chineseField.setBounds(100,0,100,40);

        mathLabel=new JLabel("数学:");
        mathLabel.setBounds(0,60,100,40);
        mathField=new JTextField();
        mathField.setBounds(100,60,100,40);

        averageLabel=new JLabel("平均分:");
        averageLabel.setBounds(0,110,100,40);
        averageField=new JTextField();
        averageField.setBounds(100,110,100,40);

        jp.add(chineseLabel);
        jp.add(chineseField);
        jp.add(mathField);
        jp.add(mathLabel);
        jp.add(averageField);
        jp.add(averageLabel);

        averageButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    double average;
                    double chinese = Double.parseDouble(chineseField.getText());
                    double math = Double.parseDouble(mathField.getText());
                    Pattern pattern=Pattern.compile("^\\d+(\\d.\\d{1,2})$");
                    Matcher chinesematch=pattern.matcher(chineseField.getText());
                    Matcher mathmatch=pattern.matcher(mathField.getText());
                    if (chinese <= 100 && chinese > 0 && math <= 100 && math > 0&&chinesematch.find()&&mathmatch.find()) {
                        average = (chinese + math) / 2.0;
                        DecimalFormat df=new DecimalFormat("##.##");
                        averageField.setText(df.format(average));
                        JOptionPane.showMessageDialog(null, "平均数成功求出", "提示", 1);
                    } else {
                        JOptionPane.showMessageDialog(null, "请输入100以内的成绩,且小数不超过两位", "提示", 0);
                    }
                }catch (NumberFormatException e1){
                    JOptionPane.showMessageDialog(null,"请输入100以内的成绩,且小数不超过两位","提示",0);
                }
            }
        });

        jp.add(averageButton);
        jf.add(jp);
        jf.setVisible(true);
    }

    public static void main(String[] args) {
        calculate c=new calculate();
    }
}
