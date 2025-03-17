import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class exam9 extends JFrame {
    private JLabel idLabel, nameLabel, sexLabel, birthdayLabel, homeLabel, addressLabel, numberLabel;
    private JTextField idField, nameField, sexField, birthdayField, homeField, addressField, numberField;
    private JButton exitButton,addButton;
    public exam9(){
        setTitle("员工管理系统");
        setSize(400,220);
        setLocation(400,400);
        setLayout(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        idLabel=new JLabel("身份证号码");
        idLabel.setBounds(20, 20, 80, 25);
        idField=new JTextField();
        idField.setBounds(100,20,80,25);
        add(idLabel);
        add(idField);

        nameLabel=new JLabel("姓名");
        nameLabel.setBounds(180,20,80,25);
        nameField=new JTextField();
        nameField.setBounds(260,20,80,25);
        add(nameField);
        add(nameLabel);

        sexLabel=new JLabel("性别");
        sexLabel.setBounds(20,45,80,25);
        sexField=new JTextField();
        sexField.setBounds(100,45,80,25);
        add(sexField);
        add(sexLabel);

        birthdayLabel=new JLabel("出生日期");
        birthdayLabel.setBounds(180,45,80,25);
        birthdayField=new JTextField();
        birthdayField.setBounds(260,45,80,25);
        add(birthdayField);
        add(birthdayLabel);

        homeLabel=new JLabel("籍贯");
        homeLabel.setBounds(20,70,80,25);
        homeField=new JTextField();
        homeField.setBounds(100,70,80,25);
        add(homeField);
        add(homeLabel);

        addressLabel=new JLabel("居住地");
        addressField=new JTextField();
        addressLabel.setBounds(180,70,80,25);
        addressField.setBounds(260,70,80,25);
        add(addressLabel);
        add(addressField);

        numberLabel=new JLabel("职工号");
        numberField=new JTextField();
        numberLabel.setBounds(20,95,80,25);
        numberField.setBounds(100,95,80,25);
        add(numberLabel);
        add(numberField);

        exitButton=new JButton("退出");
        addButton=new JButton("添加");
        exitButton.setBounds(200,120,200,50);
        addButton.setBounds(0,120,200,50);
        exitButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });

        add(exitButton);
        add(addButton);

        setVisible(true);
    }
    public static void main(String[] args) {
        new exam9();
    }
}