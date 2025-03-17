
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class ArithmeticTest extends JFrame {
    private JLabel questionLabel;
    private JTextField answerField;
    private JButton nextButton;
    private JButton finishButton;
    private JLabel scoreLabel;
    private int score = 0;
    private List<String> log = new ArrayList<>();
    private int questionIndex = 0;
    private List<ArithmeticQuestion> questions;

    public ArithmeticTest() {
        setTitle("算术运算测试与评分系统");
        setSize(400, 200);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        questions = generateQuestions(10); // 生成10道题目
        JPanel panel = new JPanel(new GridLayout(3, 1));
        questionLabel = new JLabel();
        Font font1=new Font(null,Font.PLAIN,20);
        questionLabel.setFont(font1);
        panel.add(questionLabel);

        answerField = new JTextField();
        Font font3 =new Font(null,Font.PLAIN,20);
        answerField.setFont(font3);
        panel.add(answerField);

        JPanel buttonPanel = new JPanel(new FlowLayout());
        nextButton = new JButton("下一题");
        Font font2=new Font(null,Font.PLAIN,20);
        nextButton.setFont(font2);
        nextButton.setPreferredSize(new Dimension(80,30));
        nextButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                processAnswer();
                try {
                    nextQuestion();
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            }
        });
        buttonPanel.add(nextButton);

        finishButton = new JButton("结束测试");
        finishButton.setPreferredSize(new Dimension(100,30));
        finishButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                processAnswer();
                try {
                    finishTest();
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            }
        });
        buttonPanel.add(finishButton);

        panel.add(buttonPanel);

        scoreLabel = new JLabel("得分: 0");
        Font font=new Font(null,Font.PLAIN,20);
        scoreLabel.setFont(font);
        panel.add(scoreLabel);

        add(panel);
        displayQuestion();

        setVisible(true);
    }

    private List<ArithmeticQuestion> generateQuestions(int count) {
        List<ArithmeticQuestion> questions = new ArrayList<>();
        Random random = new Random();
        for (int i = 0; i < count; i++) {
            int num1 = random.nextInt(100) + 1; // 生成1到100的随机整数
            int num2 = random.nextInt(100) + 1;
            boolean isAddition = random.nextBoolean(); // 随机确定是加法还是减法
            String operator = isAddition ? "+" : "-";
            String question = num1 + " " + operator + " " + num2 + " = ?";
            int answer = isAddition ? num1 + num2 : num1 - num2;
            questions.add(new ArithmeticQuestion(question, answer));
        }
        return questions;
    }

    private void displayQuestion() {
        if (questionIndex < questions.size()) {
            questionLabel.setText(questions.get(questionIndex).getQuestion());
        }
    }

    private void processAnswer() {
        if (questionIndex < questions.size()) {
            String userAnswerStr = answerField.getText().trim();
            if (!userAnswerStr.isEmpty()) {
                try {
                    int userAnswer = Integer.parseInt(userAnswerStr);
                    int correctAnswer = questions.get(questionIndex).getAnswer();
                    if (userAnswer == correctAnswer) {
                        score++;
                    }
                    log.add(questions.get(questionIndex).getQuestion() + " = " + userAnswer + " (正确答案: " + correctAnswer + ")");
                    scoreLabel.setText("得分: " + score);
                } catch (NumberFormatException e) {
                    JOptionPane.showMessageDialog(this, "请输入一个整数作为答案", "错误", JOptionPane.ERROR_MESSAGE);
                }
            }
        }
    }

    private void nextQuestion() throws IOException {
        questionIndex++;
        if (questionIndex < questions.size()) {
            displayQuestion();
            answerField.setText("");
        } else {
            finishTest();
        }
    }

    private void finishTest() throws IOException {
        nextButton.setEnabled(false);
        finishButton.setEnabled(false);

        // 将考试记录保存到文件中
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("D:\\IDEA document\\exam9\\src\\exam_log.txt"))) {
            for (String entry : log) {
                writer.write(entry);
                writer.newLine();
            }
            JDialog jDialog=new JDialog();
            jDialog.setSize(200,200);
            jDialog.setLocationRelativeTo(null);
            jDialog.setLayout(new BorderLayout());
            jDialog.setTitle("考试结束");
            UIManager.put("OptionPane.messageFont",new Font(null,Font.PLAIN,20));
            UIManager.put("OptionPane.buttonFont",new Font(null,Font.PLAIN,20));
            UIManager.put("Button.font",new Font(null,Font.PLAIN,20));
           JOptionPane jOptionPane=new JOptionPane("考试已结束。得分: " + score ,JOptionPane.INFORMATION_MESSAGE);
            jOptionPane.addPropertyChangeListener(new PropertyChangeListener() {
                @Override
                public void propertyChange(PropertyChangeEvent evt) {
                    if ("value".equals(evt.getPropertyName())) {
                        if (JOptionPane.OK_OPTION == ((Integer) evt.getNewValue()).intValue()) {
                            jDialog.dispose(); // 关闭对话框
                        }
                    }
                }
            });

           jDialog.add(jOptionPane);
           jDialog.setVisible(true);
           jDialog.setDefaultCloseOperation(JDialog.DISPOSE_ON_CLOSE);
        }
    }

    public static void main(String[] args) {
        ArithmeticTest arithmeticTest=new ArithmeticTest();
    }
}
