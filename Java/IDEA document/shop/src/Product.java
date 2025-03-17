import java.io.Serializable;

public class Product implements Serializable {
    private String productId;
    private String name;
    private String category;
    private double purchasePrice;
    private double retailPrice;

    public Product(String productId, String name, String category, double purchasePrice, double retailPrice) {
        this.productId = productId;
        this.name = name;
        this.category = category;
        this.purchasePrice = purchasePrice;
        this.retailPrice = retailPrice;
    }

    // Getters and setters
    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public double getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(double retailPrice) {
        this.retailPrice = retailPrice;
    }

    @Override
    public String toString() {
        return productId + "," + name + "," + category + "," + purchasePrice + "," + retailPrice;
    }
}
