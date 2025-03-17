package ATM;

public class SystemStarter {
    public static void main(String[] args) {
        ATMSystem atmSystem=new ATMSystem();
        new LoginFrame(atmSystem).loginFrame.setVisible(true);
    }
}
