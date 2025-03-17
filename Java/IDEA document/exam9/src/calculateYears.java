import  javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class calculateYears {
    private JFrame frame;
    private JPanel panel;
    private JLabel label;
    private JTextField text;
    private JButton button;
    public calculateYears(){
        frame=new JFrame();
        frame.setSize(350,200);
        frame.setLocation(400,400);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        panel=new JPanel(null);

        label=new JLabel("请输入一个年份的整数:");
        label.setBounds(20,20,140,30);

        text=new JTextField();
        text.setBounds(160,20,140,30);

        button=new JButton("验证按钮");
        button.setBounds(80,70,150,40);

        button.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                double year=Double.parseDouble(text.getText());
                if(year%4==0&&(year%100!=0||year%400==0)&&year>0){
                    JOptionPane.showMessageDialog(null,"输入的年份是闰年","提示",1);
                } else if (year<0) {
                    JOptionPane.showMessageDialog(null,"请输入正确的年份,年份不能为负","提示",0);
                } else{
                    JOptionPane.showMessageDialog(null,"输入的年份不是闰年","警告",0);
                }
            }
        });

        panel.add(text);
        panel.add(button);
        panel.add(label);

        frame.add(panel);
        frame.setVisible(true);

    }

    public static void main(String[] args) {
        calculateYears cy=new calculateYears();
    }
}
