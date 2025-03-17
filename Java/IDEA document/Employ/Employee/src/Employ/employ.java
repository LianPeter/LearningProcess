package Employ;

public abstract class employ {
    private int id;
    private String Name;
    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }
    public abstract void work();
}
