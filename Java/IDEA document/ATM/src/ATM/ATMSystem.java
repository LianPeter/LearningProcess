package ATM;

public class ATMSystem{
    private String ID="123456";
    private String Password="123456";
    private Integer Money=0;

    public String getID() {
        return ID;
    }
    public void setID(String ID) {
        this.ID = ID;
    }

    public Integer getMoney() {
        return Money;
    }

    public void setMoney(Integer money) {
        Money = money;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String toString(){
        return "用户"+"["+"卡号:"+ID+","+"密码:"+Password+","+"可用余额:"+Money+"]";
    }
}
